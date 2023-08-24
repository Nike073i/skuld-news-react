import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const counterValue = useCounterValue();
    const { decrement, increment } = useCounterActions();

    const handleInc = () => increment();
    const handleDec = () => decrement();

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleInc} data-testid="increment-btn">
                ++
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDec}>
                --
            </Button>
        </div>
    );
};
