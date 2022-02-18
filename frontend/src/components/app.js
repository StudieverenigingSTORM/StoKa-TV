'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    const Arrangement = require('components/arrangement');
    const ErrorMessage = require('components/error-message');
    const LoadingScreen = require('components/loading-screen');
    const Title = require('components/title');

    class App extends React.Component {
        constructor(props) {
            super(props);
            
            this.setupKeyListeners(window.document);

            this.state = {
                error: null,
                hasLoaded: false,
                arrangements: [],
                currentArrangement: window.location.pathname.substring(1),
            }
        }

        setupKeyListeners(eventTarget) {
            const app = this;
            eventTarget.addEventListener('keyup', function(event){
                if(event.key == 'ArrowRight') {
                    app.selectNextArrangement();
                }
                else if(event.key == 'ArrowLeft') {
                    app.selectPreviousArrangement();
                }
            });
        }

        getCurrentArrangementIndex() {
            const arrangements = this.state.arrangements;
            const currentArrangement = this.state.currentArrangement;
            if(arrangements.length == 0) {
                return null;
            }
            let index = arrangements.indexOf(currentArrangement);
            if(index == -1) {
                index = 0;
            }
            return index;
        }

        selectArrangementIfCurrentNullOrDeleted() {
            const arrangements = this.state.arrangements;
            const currentArrangement = this.state.currentArrangement;
            if(arrangements.indexOf(currentArrangement) == -1) {
                this.selectArrangement(0);
            }
        }

        selectArrangementByKey(key) {
            if(arrangements == null) {
                return
            }
            // TODO implement
            // Search through arrangements for a name matching key
            // Compute the index
            // Select this arrangment
            console.error(Error('not implemented'));
        }

        selectArrangement(index) {
            const arrangement = this.state.arrangements[index]
            this.setState({
                currentArrangement: arrangement,
            });
            window.history.pushState({}, '', arrangement);
        }

        selectNextArrangement() {
            const arrangements = this.state.arrangements
            if(arrangements == null) {
                return
            }
            let index = this.getCurrentArrangementIndex();
            if(index != null) {
                index = (index + 1) % arrangements.length;
                this.selectArrangement(index)
            }
        }

        selectPreviousArrangement() {
            const arrangements = this.state.arrangements
            if(arrangements == null) {
                return
            }
            let index = this.getCurrentArrangementIndex();
            if(index != null) {
                index = (index - 1 + arrangements.length) % arrangements.length;
                this.selectArrangement(index)
            }
        }

        loadArrangements() {
            const url = `${this.props.config.apiBaseUrl}/arrangements`;
            return fetch(url)
                .then((result) => {
                    if (!result.ok) {
                        throw `Error getting result from API\n(fetching ${url})`;
                    }
                    result.json().then((data) => {
                        this.setState({
                            hasLoaded: true,
                            arrangements: data,
                            error: null,
                        });
                        this.selectArrangementIfCurrentNullOrDeleted();
                    });
                })
                .catch((error) => this.setState({
                    hasLoaded: true,
                    error
                }));
        }

        componentDidMount() {
            this.loadArrangements();
        }

        render() {
            const { error, hasLoaded, currentArrangement } = this.state;
            if (error) {
                return e(ErrorMessage, { message: error });
            }
            else if (hasLoaded && currentArrangement != null) {
                const arrangement = e(
                    Arrangement,
                    {
                        key: 'arrangement',
                        apiBaseUrl: this.props.config.apiBaseUrl,
                        arrangement: currentArrangement,
                    }
                );
                const title = e(
                    Title,
                    {
                        key: 'title',
                        apiBaseUrl: this.props.config.apiBaseUrl,
                        arrangement: currentArrangement,
                    },
                )
                return e('div', null, [
                    arrangement,
                    title,
                ]);
            }
            else {
                return e(LoadingScreen);
            }
        }
    }

    module.exports = App;
});
