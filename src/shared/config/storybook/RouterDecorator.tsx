import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponent: any) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
