import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;
        return (
            <div className={classNames('', {}, [className])}>
                <img src={block.src} alt={block.title} className={cls.img} />
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        off={
                            <TextDeprecated
                                title={block.title}
                                align={TextAlign.CENTER}
                            />
                        }
                        on={<Text title={block.title} align="center" />}
                    />
                )}
            </div>
        );
    },
);
