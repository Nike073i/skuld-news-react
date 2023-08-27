import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Card } from '@/shared/ui/deprecated/Card';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

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
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                placeholder={t('YourFeedback')}
                value={feedback}
                onChange={setFeedback}
            />
        </>
    );

    return (
        <Card data-testid="RatingCard" className={className} fullWidth>
            <VStack gap="8" align="center" max>
                <Text title={starsScore ? t('YourRate') : title} />
                <StarRating
                    size={40}
                    selectedStars={rate}
                    onSelect={onSelectStar}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button
                                onClick={cancelHandle}
                                theme={ButtonTheme.OUTLINE_DANGER}
                            >
                                {t('Close')}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                onClick={acceptHanlde}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <Button
                            data-testid="RatingCard.Send"
                            onClick={acceptHanlde}
                            size={ButtonSize.L}
                            fullWidth
                        >
                            {t('Send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
