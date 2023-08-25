import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlags } from './setGetFeatures';

interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeatures<T>(options: ToggleFeaturesOptions<T>) {
    const { name, on, off } = options;
    return getFeatureFlags(name) ? on() : off();
}
