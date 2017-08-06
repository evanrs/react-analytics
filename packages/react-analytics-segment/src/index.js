import createSegment from './createSegment'
import SegmentFacade from './SegmentFacade'

const cache = {};
export default function getSegmentAnalytics(writeKey) {
    if (typeof window === 'undefined') {
        console.warn('Attempting to load client side analytics');
        return;
    }

    if (!writeKey) {
        console.error('[mountAnalytics] missing segment writeKey');
        return;
    }

    if (!cache[writeKey]) {
        cache[writeKey] = new SegmentFacade(createSegment(writeKey));
    }

    if (!cache[writeKey]) {
        console.error('[mountAnalytics] analytics failed to mount');
    }

    return cache[writeKey];
}
