import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: any) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };
