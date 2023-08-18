import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Card } from '@/shared/ui/Card/Card';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsScore: number) => void;
    onAccept?: (starsScore: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        title,
    } = props;
    const mods = {};
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsScore, setStarsScore] = useState(0);
    const [feedback, setFeedback] = useState<string>();

    const onSelectStar = useCallback((selectedStarsScore: number) => {
        setStarsScore(selectedStarsScore);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsScore);
        }
    }, [hasFeedback, onAccept]);

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
            <Input placeholder={t('YourFeedback')} value={feedback} onChange={setFeedback} />
        </>
    );

    return (
        <Card className={classNames('', mods, [className])}>
            <VStack gap="8" align="center" max>
                <Text title={title} />
                <StarRating size={40} onSelect={onSelectStar} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    <VStack gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_DANGER}>
                                {t('Close')}
                            </Button>
                            <Button onClick={acceptHanlde} theme={ButtonTheme.OUTLINE}>
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
                        <Button onClick={acceptHanlde} size={ButtonSize.L} fullWidth>
                            {t('Send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
