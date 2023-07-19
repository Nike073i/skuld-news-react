import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {
    test('Test render', () => {
        render(<Button>TestContent</Button>);
        expect(screen.getByText('TestContent')).toBeInTheDocument();
    });

    test('Test clear theme', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TestContent</Button>);
        expect(screen.getByText('TestContent')).toHaveClass('clear');
    });
});
