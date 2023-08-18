import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';
import StarIcon from '@/shared/assets/icons/star-24-22.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsScore: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size = 30,
        selectedStars = 0,
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsScore: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsScore);
        }
    };
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onStarClick = (starsScore: number) => () => {
        if (!isSelected) {
            onSelect?.(starsScore);
            setCurrentStarsCount(starsScore);
            setIsSelected(true);
        }
    };
    return (
        <div
            className={classNames(cls.starRating, {}, [className])}
        >
            {stars.map((score) => {
                const mods = {
                    [cls.hovered]: currentStarsCount >= score,
                    [cls.selected]: isSelected,
                };
                return (
                    <Icon
                        Svg={StarIcon}
                        key={score}
                        className={classNames(cls.starIcon, mods)}
                        width={size}
                        height={size}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(score)}
                        onClick={onStarClick(score)}
                    />
                );
            })}
        </div>
    );
});
