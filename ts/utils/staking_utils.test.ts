import { BigNumber } from '@0x/utils';

import { stakingUtils } from 'ts/utils/staking_utils';

import { PoolWithStats } from 'ts/types';

const { getRecommendedStakingPools } = stakingUtils;

// Snapshot from Kovan (1/3/2020)
const SAMPLE_POOLS: PoolWithStats[] = [
    {
        poolId: '1',
        operatorAddress: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        createdAt: {
            blockNumber: 14491738,
            txHash: '0xea30da4f4a5ccb209fe7861c71b0c365684af076924a23e48a9028c8b7e13e5b',
        },
        metaData: {
            name: 'Over 9000',
            bio: 'All your stake are belong to us',
            location: 'San Francisco, CA',
            isVerified: false,
            logoUrl: 'https://github.com/0xProject/0x-staking-pool-registry/raw/master/logos/0x.png',
            websiteUrl: 'http://0x.org',
        },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '1',
            zrxStaked: 29602.75,
            operatorShare: 0.000004,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '1',
            zrxStaked: 29602.75,
            operatorShare: 0.000004,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '2',
        operatorAddress: '0x6ecbe1db9ef729cbe972c83fb886247691fb6beb',
        createdAt: {
            blockNumber: 14576829,
            txHash: '0x4d587b256b712a456cca2297d599460942444f0cf04774fe48d380b06e89bfb0',
        },
        metaData: {
            name: "Will Warren's Magical Market Making Machine (MMM)",
            bio: 'All your stake are belong to us',
            location: 'San Francisco, CA',
            isVerified: false,
            logoUrl: 'https://github.com/0xProject/0x-staking-pool-registry/raw/master/logos/0x.png',
            websiteUrl: 'http://0x.org',
        },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '2',
            zrxStaked: 1738.6666666666667,
            operatorShare: 0.000002,
            approximateStakeRatio: 0,
            makerAddresses: ['0x6ecbe1db9ef729cbe972c83fb886247691fb6beb'],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '2',
            zrxStaked: 1738.6666666666667,
            operatorShare: 0.000002,
            approximateStakeRatio: 0,
            makerAddresses: ['0x6ecbe1db9ef729cbe972c83fb886247691fb6beb'],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '3',
        operatorAddress: '0xe36ea790bc9d7ab70c55260c66d52b1eca985f84',
        createdAt: {
            blockNumber: 14730024,
            txHash: '0x7cdeab4f2dbc5e231db5b28593891943c516908af8335f99bc92168e04e6aceb',
        },
        metaData: {
            name: "Amir's Liquidity Floodgate",
            bio: 'All your stake are belong to us',
            location: 'San Francisco, CA',
            isVerified: false,
            logoUrl: 'https://github.com/0xProject/0x-staking-pool-registry/raw/master/logos/0x.png',
            websiteUrl: 'http://0x.org',
        },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '3',
            zrxStaked: 318.26666666666665,
            operatorShare: 0.49,
            approximateStakeRatio: 0,
            makerAddresses: ['0xe36ea790bc9d7ab70c55260c66d52b1eca985f84'],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '3',
            zrxStaked: 318.26666666666665,
            operatorShare: 0.49,
            approximateStakeRatio: 0,
            makerAddresses: ['0xe36ea790bc9d7ab70c55260c66d52b1eca985f84'],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '4',
        operatorAddress: '0x3998a82afec0bbde9021fcf16c753b3cbb6a78b2',
        createdAt: {
            blockNumber: 14768235,
            txHash: '0x0bea3f8bf9e35c00313fc8126f2997c3eda95bef33a24e7e71b5c78d9390ace0',
        },
        metaData: {
            name: '0x 4 lyfe',
            bio: 'All your stake are belong to us',
            location: 'San Francisco, CA',
            isVerified: false,
            logoUrl: 'https://github.com/0xProject/0x-staking-pool-registry/raw/master/logos/0x.png',
            websiteUrl: 'http://0x.org',
        },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '4',
            zrxStaked: 1145.4833333333333,
            operatorShare: 0.000095,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '4',
            zrxStaked: 1145.4833333333333,
            operatorShare: 0.000095,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '5',
        operatorAddress: '0x3998a82afec0bbde9021fcf16c753b3cbb6a78b2',
        createdAt: {
            blockNumber: 14768243,
            txHash: '0x0463f2b864b14262377b4edfd42e48ff0c514a95a138269084aa1e52aadf609b',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '5',
            zrxStaked: 35.33333333333333,
            operatorShare: 0.7,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '5',
            zrxStaked: 49.70333333333333,
            operatorShare: 0.7,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '6',
        operatorAddress: '0x3998a82afec0bbde9021fcf16c753b3cbb6a78b2',
        createdAt: {
            blockNumber: 14769171,
            txHash: '0x8687710e59c44f0632e9a64f67c03e30dc5e52dac198bd04a26628bec3321e90',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '6',
            zrxStaked: 2,
            operatorShare: 0.999999,
            approximateStakeRatio: 0,
            makerAddresses: ['0x3998a82afec0bbde9021fcf16c753b3cbb6a78b2'],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '6',
            zrxStaked: 2,
            operatorShare: 0.999999,
            approximateStakeRatio: 0,
            makerAddresses: ['0x3998a82afec0bbde9021fcf16c753b3cbb6a78b2'],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '7',
        operatorAddress: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        createdAt: {
            blockNumber: 14797004,
            txHash: '0x99a283cb02f925cc03d20998f0c565e388fc0740c5f7ace360b3cb07f4d7a5eb',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '7',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '7',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '8',
        operatorAddress: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        createdAt: {
            blockNumber: 14797017,
            txHash: '0xb6e261156d6a4a01ced813662e305cfd485d487710f66b259fe7e50009e7db87',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '8',
            zrxStaked: 1474.0966666666668,
            operatorShare: 0,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '8',
            zrxStaked: 1174.0966666666668,
            operatorShare: 0,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '9',
        operatorAddress: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        createdAt: {
            blockNumber: 15303667,
            txHash: '0x3fe6dc177e40c260bb43716753186a9ba716e097cbac74ac00a9a86d4e360482',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '9',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '9',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: [],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
    {
        poolId: '10',
        operatorAddress: '0x5409ed021d9299bf6814279a6a1411a7e866a631',
        createdAt: {
            blockNumber: 15303725,
            txHash: '0x34de21634f0aee11980ec656b2ea681aa806d5cad380b1dbc9c3aa6ccd139267',
        },
        metaData: { isVerified: false },
        sevenDayProtocolFeesGeneratedInEth: 0,
        currentEpochStats: {
            poolId: '10',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: ['0x5409ed021d9299bf6814279a6a1411a7e866a631'],
            totalProtocolFeesGeneratedInEth: 0,
        },
        nextEpochStats: {
            poolId: '10',
            zrxStaked: 0,
            operatorShare: 1,
            approximateStakeRatio: 0,
            makerAddresses: ['0x5409ed021d9299bf6814279a6a1411a7e866a631'],
            totalProtocolFeesGeneratedInEth: 0,
        },
    },
];

describe('getRecommendedStakingPools', () => {
    test('should not break on zero', () => {
        const totalRequestedToStake = 0;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        expect(recommendedPools).toHaveLength(0);
    });

    test('should correctly distribute the entire requested value (whole number)', () => {
        const totalRequestedToStake = 470;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        const actualTotalSum = BigNumber.sum(...recommendedPools.map(x => new BigNumber(x.zrxAmount))).toNumber();
        expect(actualTotalSum).toBe(totalRequestedToStake);
    });

    test('should correctly distribute the requested value (odd decimal)', () => {
        const totalRequestedToStake = 177.77;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        const actualTotalSum = BigNumber.sum(...recommendedPools.map(x => new BigNumber(x.zrxAmount))).toNumber();
        expect(actualTotalSum).toBe(totalRequestedToStake);
    });

    test('should correctly distribute the requested value (another odd decimal)', () => {
        const totalRequestedToStake = 4200.27;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        const actualTotalSum = BigNumber.sum(...recommendedPools.map(x => new BigNumber(x.zrxAmount))).toNumber();
        expect(actualTotalSum).toBe(totalRequestedToStake);
    });

    test('should correctly distribute the requested value (very large number)', () => {
        const totalRequestedToStake = 123456789.12;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        const actualTotalSum = BigNumber.sum(...recommendedPools.map(x => new BigNumber(x.zrxAmount))).toNumber();
        expect(actualTotalSum).toBe(totalRequestedToStake);
    });

    test('should autoround if given more than two decimals', () => {
        const totalRequestedToStake = 1277.12999;
        const totalRequestedToStakeRounded = 1277.12;
        const recommendedPools = getRecommendedStakingPools(totalRequestedToStake, SAMPLE_POOLS);
        const actualTotalSum = BigNumber.sum(...recommendedPools.map(x => new BigNumber(x.zrxAmount))).toNumber();
        expect(actualTotalSum).toBe(totalRequestedToStakeRounded);
    });
});
