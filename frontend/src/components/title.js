'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;
    const { TransitionGroup, CSSTransition } = require('react-transition-group');

    const ErrorMessage = require('components/error-message');

    class Title extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                hasLoaded: false,
                title: null,
                timeout: null,
                isHidden: false,
            }
        }

        componentDidMount() {
            this.loadTitle().then(() => this.showTitle());
        }

        componentDidUpdate(prevProps) {
            if (this.props.arrangement != prevProps.arrangement) {
                this.loadTitle().then(() => this.showTitle());
            }
        }

        showTitle() {
            if (this.state.timeout != null) {
                clearTimeout(this.state.timeout);
            }
            const timeout = setTimeout(() => this.setState({
                timeout: null,
                isHidden: true,
            }), this.props.timeout || 5000);
            this.setState({
                timeout: timeout,
                isHidden: false
            });
        }

        loadTitle() {
            const url = `${this.props.apiBaseUrl}/arrangements/${this.props.arrangement}`;
            return fetch(url)
                .then((result) => {
                    if (!result.ok) {
                        throw `Error getting result from API\n(fetching ${url})`;
                    }
                    result.json().then((data) => {
                        this.setState({
                            hasLoaded: true,
                            title: data.title,
                            error: null,
                        });
                    });
                })
                .catch((error) => this.setState({
                    hasLoaded: true,
                    isHidden: false,
                    error
                }));
        }

        render() {
            const { error, hasLoaded, title, isHidden } = this.state;
            const transition = (key, children) => e(CSSTransition, {
                key: key,
                in: !isHidden,
                appear: true,
                timeout: 300,
                classNames: 'title',
            }, children);
            let activeElement = null;
            if (error) {
                activeElement = transition('error', e(ErrorMessage, { message: error }));
            }
            else if (hasLoaded && !isHidden) {
                activeElement = transition(title, e('h1', null, title));
            }
            else {
                activeElement = transition('loading', e('span', null))
            }
            return e(TransitionGroup, null, activeElement);
        }
    }

    module.exports = Title;
});
