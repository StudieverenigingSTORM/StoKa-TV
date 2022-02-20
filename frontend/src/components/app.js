'use strict';

define(function (require, exports, module) {
    const BaseComponent = require('components/base');
    const { TransitionGroup, CSSTransition } = require('react-transition-group');

    const Arrangement = require('components/arrangement');
    const ErrorMessage = require('components/error-message');
    const LoadingScreen = require('components/loading-screen');
    const Title = require('components/title');
    const Help = require('components/help');

    class App extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                hasLoaded: false,
                arrangements: [],
                currentArrangement: props.initialArrangement,
                showHelp: false,
            }
        }

        getCurrentArrangementIndex() {
            const arrangements = this.state.arrangements;
            const currentArrangement = this.state.currentArrangement;
            if (arrangements.length == 0) {
                return null;
            }
            let index = arrangements.indexOf(currentArrangement);
            if (index == -1) {
                index = 0;
            }
            return index;
        }

        selectArrangementIfCurrentNullOrDeleted() {
            const arrangements = this.state.arrangements;
            const currentArrangement = this.state.currentArrangement;
            if (arrangements.indexOf(currentArrangement) == -1) {
                if(currentArrangement.startsWith('.')) {
                    // Hidden arrangement
                    // Do not skip! (The user knows what they are doing)
                    return;
                }
                this.selectArrangement(0);
            }
        }

        selectArrangementByKey(key) {
            if (arrangements == null) {
                return
            }
            // TODO implement
            // Search through arrangements for a name matching key
            // Compute the index
            // Select this arrangement
            console.error(Error('not implemented'));
        }

        selectArrangement(index) {
            const arrangement = this.state.arrangements[index]
            this.setStateIfComponentIsMounted({
                currentArrangement: arrangement,
            }, () => this.props.onSelectArrangement(arrangement));
        }

        selectNextArrangement() {
            const arrangements = this.state.arrangements
            if (arrangements == null) {
                return
            }
            let index = this.getCurrentArrangementIndex();
            if (index != null) {
                index = (index + 1) % arrangements.length;
                this.selectArrangement(index)
            }
        }

        selectPreviousArrangement() {
            const arrangements = this.state.arrangements
            if (arrangements == null) {
                return
            }
            let index = this.getCurrentArrangementIndex();
            if (index != null) {
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
                        this.setStateIfComponentIsMounted({
                            hasLoaded: true,
                            arrangements: data,
                            error: null,
                        });
                        this.selectArrangementIfCurrentNullOrDeleted();
                    });
                })
                .catch((error) => this.setStateIfComponentIsMounted({
                    hasLoaded: true,
                    error
                }));
        }

        componentDidMount() {
            super.componentDidMount();
            this.loadArrangements();
            setInterval(() => this.loadArrangements(), this.props.config.reloadArrangementsInterval);
        }

        toggleHelp() {
            this.setStateIfComponentIsMounted({
                showHelp: !this.state.showHelp
            });
        }

        render() {
            const { error, hasLoaded, currentArrangement } = this.state;
            let key = null;
            let activeElement = null;
            const transitionTime = this.props.config.transitionTime
            if (error) {
                key = 'error';
                activeElement = e(ErrorMessage, { message: error });
            }
            else if (hasLoaded && currentArrangement != null) {
                key = `arrangement-${currentArrangement}`;
                const arrangement = e(
                    Arrangement,
                    {
                        key: 'arrangement',
                        apiBaseUrl: this.props.config.apiBaseUrl,
                        arrangement: currentArrangement,
                        transitionTime,
                    }
                );
                const title = e(
                    Title,
                    {
                        key: 'title',
                        apiBaseUrl: this.props.config.apiBaseUrl,
                        arrangement: currentArrangement,
                        timeout: this.props.config.titleTimeout,
                        transitionTime,
                    },
                )
                activeElement = e('div', null, [
                    arrangement,
                    title,
                ]);
            }
            else {
                key = 'loading';
                activeElement = e(LoadingScreen);
            }
            return e('div', null, [
                e(TransitionGroup, { key: 'app-content' }, e(CSSTransition, {
                    key: key,
                    in: true,
                    appear: true,
                    timeout: transitionTime,
                    classNames: 'app-content',
                }, activeElement)),
                e('div', { key: 'help' }, this.state.showHelp ? e(Help) : null),
            ]);
        }
    }

    module.exports = App;
});
