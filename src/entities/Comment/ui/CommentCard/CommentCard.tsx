import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/consts/router';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;
    const mods = {};
    if (isLoading) {
        return (
            <VStack
                gap="8"
                max
                className={classNames(cls.commentCard, mods, [
                    className,
                    cls.loading,
                ])}
            >
                <HStack>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </HStack>
                <Skeleton height={50} width="100%" />
            </VStack>
        );
    }
    if (!comment) {
        return null;
    }
    return (
        <VStack
            data-testid="CommentCard.Content"
            gap="8"
            max
            className={classNames(cls.commentCard, mods, [className])}
        >
            <AppLink to={getRouteProfile(comment.user.id)}>
                <HStack>
                    {comment.user.avatar && (
                        <Avatar size={30} src={comment.user.avatar} />
                    )}
                    <Text
                        className={cls.username}
                        title={comment.user.username}
                    />
                </HStack>
            </AppLink>
            <Text className={cls.text} text={comment.text} />
        </VStack>
    );
});
