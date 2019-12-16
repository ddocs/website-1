import * as React from 'react';
import styled from 'styled-components';

import { Icon } from 'ts/components/icon';
import { Heading, Paragraph } from 'ts/components/text';
import { generateUniqueId, Jazzicon } from 'ts/components/ui/jazzicon';

import { colors } from 'ts/style/colors';

interface PanelHeaderProps {
    avatarSrc?: string;
    avatarComponent?: React.ReactNode;
    title?: string | React.ReactNode;
    subtitle: string;
    isResponsiveAvatar?: boolean;
    icon?: string;
    address: string;
    poolId: string;
    children?: React.ReactNode;
}

interface AvatarProps {
    isResponsive?: boolean;
}

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 30px;

    @media (max-width: 768px) {
        p {
            display: none;
        }
    }
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.figure<AvatarProps>`
    width: 80px;
    height: 80px;
    background-color: #fff;
    border: 1px solid ${colors.border};
    margin-right: 20px;
    position: relative;
    display: flex;
    overflow: hidden;

    img {
        object-fit: cover;
    }

    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        display: ${props => !props.isResponsive && 'none'};
    }
`;

const IconWrap = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid ${colors.border};
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(50%) translateY(50%);
    background-color: ${colors.white};

    svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
`;

export const PanelHeader: React.StatelessComponent<PanelHeaderProps> = ({
    avatarSrc,
    address,
    poolId,
    title,
    subtitle,
    isResponsiveAvatar,
    icon,
    children,
}) => {
    return (
        <Wrap>
            <Avatar isResponsive={isResponsiveAvatar}>
                {avatarSrc ? (
                    <img style={{ margin: 'auto' }} src={avatarSrc} />
                ) : (
                    <Jazzicon seed={generateUniqueId(address, poolId)} diameter={80} isSquare={true} />
                )}
                {icon && (
                    <IconWrap>
                        <Icon name={icon} size={24} />
                    </IconWrap>
                )}
            </Avatar>
            <div style={{ flex: 1 }}>
                <Flex>
                    <Heading size="small" fontWeight="500" isNoMargin={true} style={{ marginRight: '8px' }}>
                        {title || children}
                    </Heading>
                </Flex>

                <Paragraph fontSize="17px" isNoMargin={true}>
                    {subtitle}
                </Paragraph>
            </div>
        </Wrap>
    );
};