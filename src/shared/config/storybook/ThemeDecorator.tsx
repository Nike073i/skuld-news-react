import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: any) => (
    <div className={`app ${theme}`}>
        <StoryComponent />
    </div>
);
