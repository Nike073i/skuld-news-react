import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
    <Flex direction="row" {...props} />
);
