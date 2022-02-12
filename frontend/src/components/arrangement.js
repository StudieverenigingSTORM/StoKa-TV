'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    const ErrorMessage = require('components/error-message');
    const LoadingScreen = require('components/loading-screen');

    class Arrangement extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                hasLoaded: false,
                arrangement: null,
            }
        }

        componentDidMount() {
            this.loadArrangment();
        }

        componentDidUpdate(prevProps) {
            if(this.props.arrangement != prevProps.arrangement) {
                this.loadArrangment();
            }
        }

        loadArrangment() {
            const url = `${this.props.apiBaseUrl}/arrangements/${this.props.arrangement}`;
            return fetch(url)
                .then((result) => {
                    if (!result.ok) {
                        throw `Error getting result from API\n(fetching ${url})`;
                    }
                    result.json().then((data) => {
                        this.setState({
                            hasLoaded: true,
                            arrangement: data,
                            error: null,
                        });
                    });
                })
                .catch((error) => this.setState({
                    hasLoaded: true,
                    error
                }));
        }

        render() {
            const { error, hasLoaded, arrangement } = this.state;
            if (error) {
                return e(ErrorMessage, { message: error });
            }
            else if (hasLoaded) {
                return e('div', null, [
                    e('h1', { key: 'h1'}, this.props.arrangement),
                    e('p', { key: 'p'}, JSON.stringify(arrangement)),
                ]);
            }
            else {
                return e(LoadingScreen);
            }
        }
    }

    module.exports = Arrangement;
});
