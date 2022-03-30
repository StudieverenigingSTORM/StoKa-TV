'use strict';

define(function(require, exports, module) {
    const BaseComponent = require('./base');
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
            const makeRow = (col1, col2, key) =>
                e('tr', { key }, [e('td', { key: 'col-1' }, col1), e('td', { key: 'col-2' }, col2)]);
            const help = e('div', { className: 'card help' }, [
                e('h1', { key: 'title' }, 'Controls'),
                e('table', { key: 'table' }, e('tbody', null, [
                    makeRow('\u25c0', 'previous', 'row-0'),
                    makeRow('\u25b6', 'next', 'row-1'),
                    makeRow('\u25b2', 'toggle borrel menu', 'row-2'),
                    makeRow('\u25bc', 'toggle help', 'row-3'),
                    makeRow('0-9', 'select arrangment', 'row-4'),
                ]))
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