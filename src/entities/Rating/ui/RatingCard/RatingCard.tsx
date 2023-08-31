import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsScore: number) => void;
    onAccept?: (starsScore: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        title,
        rate = 0,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsScore, setStarsScore] = useState(rate);
    const [feedback, setFeedback] = useState<string>();

    const onSelectStar = useCallback(
        (selectedStarsScore: number) => {
            setStarsScore(selectedStarsScore);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsScore);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHanlde = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsScore, feedback);
    }, [feedback, onAccept, starsScore]);

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsScore);
    }, [onCancel, starsScore]);

    const modalContent = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        placeholder={t('YourFeedback')}
                        value={feedback}
                        onChange={setFeedback}
                    />
                </>
            }
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        placeholder={t('YourFeedback')}
                        value={feedback}
                        onChange={setFeedback}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack gap="8" align="center" max>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <>
                            <TextDeprecated
                                title={starsScore ? t('YourRate') : title}
                            />
                            <StarRatingDeprecated
                                size={40}
                                selectedStars={rate}
                                onSelect={onSelectStar}
                            />
                        </>
                    }
                    on={
                        <>
                            <Text title={starsScore ? t('YourRate') : title} />
                            <StarRating
                                size={40}
                                selectedStars={rate}
                                onSelect={onSelectStar}
                            />
                        </>
                    }
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                off={
                                    <>
                                        <ButtonDeprecated
                                            onClick={cancelHandle}
                                            theme={ButtonTheme.OUTLINE_DANGER}
                                            data-testid="RatingCard.Close"
                                        >
                                            {t('Close')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            data-testid="RatingCard.Send"
                                            onClick={acceptHanlde}
                                            theme={ButtonTheme.OUTLINE}
                                        >
                                            {t('Send')}
                                        </ButtonDeprecated>
                                    </>
                                }
                                on={
                                    <>
                                        <Button
                                            onClick={cancelHandle}
                                            data-testid="RatingCard.Close"
                                        >
                                            {t('Close')}
                                        </Button>
                                        <Button
                                            data-testid="RatingCard.Send"
                                            onClick={acceptHanlde}
                                        >
                                            {t('Send')}
                                        </Button>
                                    </>
                                }
                            />
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            off={
                                <ButtonDeprecated
                                    data-testid="RatingCard.Send"
                                    onClick={acceptHanlde}
                                    size={ButtonSize.L}
                                    fullWidth
                                >
                                    {t('Send')}
                                </ButtonDeprecated>
                            }
                            on={
                                <Button
                                    data-testid="RatingCard.Send"
                                    onClick={acceptHanlde}
                                    size="size_l"
                                    fullWidth
                                >
                                    {t('Send')}
                                </Button>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <CardDeprecated
                    data-testid="RatingCard"
                    className={className}
                    fullWidth
                >
                    {content}
                </CardDeprecated>
            }
            on={
                <CardRedesigned
                    data-testid="RatingCard"
                    className={className}
                    fullWidth
                    border="partial"
                    padding="24"
                >
                    {content}
                </CardRedesigned>
            }
        />
    );
});
