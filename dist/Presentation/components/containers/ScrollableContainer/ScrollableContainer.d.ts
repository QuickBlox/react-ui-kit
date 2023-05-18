import React from 'react';
import './ScrollableContainer.scss';
interface FlatListProps<T> {
    className?: string;
    data: Array<T>;
    ListEmptyComponent?: React.ComponentClass | React.FunctionComponent;
    onEndReached?: VoidFunction;
    onEndReachedThreshold?: number;
    refreshing?: boolean;
    autoScrollToBottom?: boolean;
    renderItem: (item: T, index: number) => React.ReactElement | null;
}
export default function ScrollableContainer<T>(props: FlatListProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
