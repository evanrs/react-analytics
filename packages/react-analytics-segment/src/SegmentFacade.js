import { wrap } from 'lodash';
import boundFuture from 'utils/async/boundFuture';
const debug = require('debug')('SegmentFacade');

/**
 * Provide interface to segment identical to node API
 */
export default class SegmentFacade {
    constructor(analytics) {
        this.analytics = analytics;

        this.ready = boundFuture(0, 1000)(
            new Promise(resolve => this.analytics.ready(() => resolve(this))),
        ).catch(debug);

        this.identified = boundFuture(0, 2000)(
            new Promise(resolve => {
                this.identify = wrap(this.identify, (identify, ...args) =>
                    Promise.resolve(this.ready)
                        .then(() => identify(...args))
                        .then(() => resolve(this)),
                );
            }),
        ).catch(debug);
    }

    alias = async ({ userId, previousId } = {}, options = {}) => {
        debug('alias', userId, previousId, options);
        this.analytics.alias(userId, previousId, options);
    };

    identify = async ({ userId, anonymousId, ...props } = {}, options = {}) => {
        options = { anonymousId, ...options };
        debug('identify', userId, props, options);
        this.analytics.identify(userId, props, options);
    };

    track = async ({ event, anonymousId, ...props } = {}, options = {}) => {
        await this.identified;
        options = { anonymousId, ...options };
        debug('track', event, props, options);
        this.analytics.track(event, props, options);
    };

    page = async ({ category, name, anonymousId, ...props } = {}, opt = {}) => {
        await this.identified;
        opt = { anonymousId, ...opt };
        debug('page', category, name, props, opt);
        this.analytics.page(category, name, props, opt);
    };

    screen = async ({ name, ...props } = {}, options = {}) => {
        await this.identified;
        debug('screen', name, props, options);
        this.analytics.screen(name, props, options);
    };

    group = async ({ groupId, ...traits } = {}, options = {}) => {
        await this.identified;
        debug('group', groupId, traits, options);
        this.analytics.group(groupId, traits, options);
    };
}
