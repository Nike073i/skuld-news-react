import { Suspense } from 'react';

export const SuspenseDecorator = (StoryComponent: any) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
