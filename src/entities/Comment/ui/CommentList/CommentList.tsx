import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;
    const { t } = useTranslation('comment');
    const mods = {};

    if (isLoading) {
        return (
            <div className={classNames(cls.commentList, mods, [className])}>
                <CommentCard isLoading className={cls.comment} />
                <CommentCard isLoading className={cls.comment} />
                <CommentCard isLoading className={cls.comment} />
            </div>
        );
    }
    return (
        <div className={classNames('', mods, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                    />
                ))
                : <Text text={t('NoComments')} />}
        </div>
    );
});
