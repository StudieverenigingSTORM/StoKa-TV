'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    const Arrangement = require('components/arrangement');
    const ErrorMessage = require('components/error-message');
    const LoadingScreen = require('components/loading-screen');

    class App extends React.Component {
        constructor(props) {
            super(props);
            
            this.setupKeyListeners(document);

            this.state = {
                error: null,
                hasLoaded: false,
                arrangements: [],
                currentArrangement: null,
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

        selectArrangementIfNullOrDeleted() {
            if(this.state.currentArrangement == null) {
                const index = this.getCurrentArrangementIndex();
                this.setState({
                    currentArrangement: this.state.arrangements[index],
                });
            }
        }

        selectArrangement(key) {
            if(arrangements == null) {
                return
            }
            // TODO implement
            // Search through arrangements for a name matching key
            // Compute the index
            // Select this arrangment
            console.error(Error('not implemented'));
        }

        selectNextArrangement() {
            const arrangements = this.state.arrangements
            if(arrangements == null) {
                return
            }
            var index = this.getCurrentArrangementIndex();
            if(index != null) {
                index = (index + 1) % arrangements.length;
                this.setState({
                    currentArrangement: arrangements[index],
                });
            }
        }

        selectPreviousArrangement() {
            const arrangements = this.state.arrangements
            if(arrangements == null) {
                return
            }
            var index = this.getCurrentArrangementIndex();
            if(index != null) {
                index = (index - 1 + arrangements.length) % arrangements.length;
                this.setState({
                    currentArrangement: arrangements[index],
                });
            }
        }

        loadArrangments() {
            fetch(`${this.props.apiBaseUrl}/arrangements`)
                .then((result) => {
                    if (!result.ok) {
                        throw Error('Error getting result from API');
                    }
                    result.json().then((data) => {
                        this.setState({
                            hasLoaded: true,
                            arrangements: data,
                        });
                        this.selectArrangementIfNullOrDeleted();
                    });
                })
                .catch((error) => this.setState({
                    hasLoaded: true,
                    error
                }));
        }

        componentDidMount() {
            this.loadArrangments();
        }

        render() {
            const { error, hasLoaded, currentArrangement } = this.state;
            if (error) {
                return e(ErrorMessage, { errorObject: error });
            }
            else if (hasLoaded && currentArrangement != null) {
                return e(Arrangement, { arrangement: currentArrangement });
            }
            else {
                return e(LoadingScreen);
            }
        }
    }

    module.exports = App;
});