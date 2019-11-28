import { StakingContract, StakingProxyContract } from '@0x/abi-gen-wrappers';
import { getContractAddressesForChainOrThrow } from '@0x/contract-addresses';
import { ERC20TokenContract } from '@0x/contract-wrappers';
import { BigNumber, logUtils } from '@0x/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import * as _ from 'lodash';

import { Dispatcher } from 'ts/redux/dispatcher';
import { AccountReady, AccountState, Network, ProviderState, StakeStatus } from 'ts/types';
import { backendClient } from 'ts/utils/backend_client';
import { constants } from 'ts/utils/constants';

// NOTE: Copied from Instant
export const asyncDispatcher = {
    fetchAccountInfoAndDispatchToStoreAsync: async (
        providerState: ProviderState,
        dispatcher: Dispatcher,
        networkId: Network,
        shouldAttemptUnlock: boolean = false,
        shouldSetToLoading: boolean = false,
    ) => {
        const web3Wrapper = providerState.web3Wrapper;
        const provider = providerState.provider;
        if (shouldSetToLoading && providerState.account.state !== AccountState.Loading) {
            dispatcher.setAccountStateLoading();
        }
        let availableAddresses: string[];
        try {
            // TODO(bmillman): Add support at the web3Wrapper level for calling `eth_requestAccounts` instead of calling enable here
            const isPrivacyModeEnabled = (provider as any).enable !== undefined;
            availableAddresses =
                isPrivacyModeEnabled && shouldAttemptUnlock
                    ? await (provider as any).enable()
                    : await web3Wrapper.getAvailableAddressesAsync();
        } catch (e) {
            dispatcher.setAccountStateLocked();
            return;
        }
        if (!_.isEmpty(availableAddresses)) {
            const activeAddress = availableAddresses[0];
            dispatcher.setAccountStateReady(activeAddress);

            await asyncDispatcher.fetchAccountBalanceAndDispatchToStoreAsync(
                activeAddress,
                providerState.web3Wrapper,
                dispatcher,
                networkId,
            );
        } else {
            dispatcher.setAccountStateLocked();
        }
    },

    fetchAccountBalanceAndDispatchToStoreAsync: async (
        address: string,
        web3Wrapper: Web3Wrapper,
        dispatcher: Dispatcher,
        networkId: Network,
    ) => {
        try {
            const provider = web3Wrapper.getProvider();
            const contractAddresses = getContractAddressesForChainOrThrow(networkId as number);
            const zrxTokenContract = new ERC20TokenContract(contractAddresses.zrxToken, provider);
            const [ethBalanceInWei, zrxBalance, zrxAllowance] = await Promise.all([
                web3Wrapper.getBalanceInWeiAsync(address),
                zrxTokenContract.balanceOf(address).callAsync(),
                zrxTokenContract.allowance(address, contractAddresses.erc20Proxy).callAsync(),
            ]);

            dispatcher.updateAccountEthBalance({ address, ethBalanceInWei });
            dispatcher.updateAccountZrxBalance(zrxBalance);
            dispatcher.updateAccountZrxAllowance(zrxAllowance);
        } catch (e) {
            logUtils.warn(e);
            return;
        }
    },

    increaseZrxAllowanceAndDispatchToStoreIfNeededAsync: async (
        providerState: ProviderState,
        networkId: Network,
        dispatcher: Dispatcher,
    ) => {
        const { provider } = providerState;
        const ownerAddress = (providerState.account as AccountReady).address;
        const gasInfo = await backendClient.getGasInfoAsync();

        const contractAddresses = getContractAddressesForChainOrThrow(networkId as number);
        const erc20ProxyAddress = contractAddresses.erc20Proxy;
        const zrxTokenContract = new ERC20TokenContract(contractAddresses.zrxToken, provider);

        const currentAllowance = await zrxTokenContract.allowance(ownerAddress, erc20ProxyAddress).callAsync();

        // TODO: some information modal needed?
        if (currentAllowance.isLessThan(constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)) {
            // tslint:disable:await-promise
            await zrxTokenContract
                .approve(erc20ProxyAddress, constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)
                .awaitTransactionSuccessAsync({
                    from: ownerAddress,
                    gasPrice: gasInfo.gasPriceInWei,
                });
            dispatcher.updateAccountZrxAllowance(constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
        }
    },

    depositStakeToContractAndStakeWithPoolAsync: async (
        providerState: ProviderState,
        networkId: Network,
        amountToStakeBaseUnits: BigNumber,
        poolId: string,
    ) => {
        const ownerAddress = (providerState.account as AccountReady).address;
        const contractAddresses = getContractAddressesForChainOrThrow(networkId as number);

        const stakingContract = new StakingContract(contractAddresses.stakingProxy, providerState.provider, {
            from: ownerAddress,
        });
        const stakingProxyContract = new StakingProxyContract(contractAddresses.stakingProxy, providerState.provider, {
            from: ownerAddress,
        });

        // TODO(kimpers): update quip docs with new way to call methods
        const data = [
            stakingContract.stake(amountToStakeBaseUnits).getABIEncodedTransactionData(),
            stakingContract
                .moveStake(
                    { status: StakeStatus.Undelegated, poolId: constants.STAKING.NIL_POOL_ID }, // From undelegated
                    { status: StakeStatus.Delegated, poolId }, // To the pool
                    amountToStakeBaseUnits,
                )
                .getABIEncodedTransactionData(),
        ];

        await stakingProxyContract.batchExecute(data).awaitTransactionSuccessAsync({ from: ownerAddress });
    },
};
