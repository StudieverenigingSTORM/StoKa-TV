'use strict';

define(function(require, exports, module) {
    const BaseComponent = require('./base');
    const { TransitionGroup, CSSTransition } = require('react-transition-group');

    class NotFound extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = {
                isHidden: true,
                timeout: null,
            }
        }

        componentDidMount() {
            super.componentDidMount();
        }

        show(timeout) {
            const notFound = this;
            let onTimeout = null;
            if (timeout != null) {
                onTimeout = setTimeout(() => {
                    notFound.setStateIfComponentIsMounted({
                        isHidden: true,
                        timeout: null,
                    });
                }, timeout);
            }
            if (notFound.state.timeout != null) {
                clearTimeout(notFound.state.timeout);
            }
            notFound.setStateIfComponentIsMounted({
                isHidden: false,
                timeout: onTimeout,
            });
        }

        render() {
            const notFound = e('div', { className: 'card' }, e('h1', null, 'Not found!'));
            let activeElement;
            if (this.state.isHidden) {
                activeElement = e('span');
            } else {
                activeElement = e('div', {
                    className: 'not-found fullscreen-fit'
                }, notFound);
            }

            return e(TransitionGroup, null, e(CSSTransition, {
                key: !this.state.isHidden,
                in: true,
                timeout: this.props.transitionTime,
                classNames: 'fade',
            }, activeElement));
        }
    }

    module.exports = NotFound;
});