'use strict';

define(function(require, exports, module) {
    const BaseComponent = require('components/base');
    const { TransitionGroup, CSSTransition } = require('react-transition-group');

    class Help extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = {
                isHidden: !props.showInitially || false,
            }
        }

        componentDidMount() {
            super.componentDidMount();
        }

        isHidden() {
            return this.state.isHidden;
        }

        show() {
            this.setStateIfComponentIsMounted({
                isHidden: false
            });
        }

        hide() {
            this.setStateIfComponentIsMounted({
                isHidden: true
            });
        }

        render() {
            const wideWhitespace = '\u2001';
            const help = e('div', { className: 'card help' }, [
                e('h1', { key: '0' }, 'Controls'),
                e('p', { key: '1' }, `\u25c0${ wideWhitespace }previous`),
                e('p', { key: '2' }, `\u25b6${ wideWhitespace }next`)
            ]);
            return e(TransitionGroup, null, e(CSSTransition, {
                key: !this.state.isHidden,
                in: true,
                timeout: this.props.transitionTime,
                classNames: 'fade',
            }, this.state.isHidden ? e('span') : help));
        }
    }

    module.exports = Help;
});