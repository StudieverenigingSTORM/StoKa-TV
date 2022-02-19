'use strict';

define(function (require, exports, module) {
    const BaseComponent = require('components/base');
    const ErrorMessage = require('components/error-message');
    const LoadingScreen = require('components/loading-screen');

    class Arrangement extends BaseComponent {
        constructor(props) {
            super(props);

            this.state = {
                error: null,
                hasLoaded: false,
                arrangement: null,
                itemIndex: 0,
            }
        }

        componentDidMount() {
            super.componentDidMount();
            this.loadArrangment();
        }

        shouldComponentUpdate(nextProps, nextState) {
            return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
            JSON.stringify(this.state) !== JSON.stringify(nextState);
        }

        componentDidUpdate() { 
            if(this.state.error != null || !this.state.hasLoaded) {
                return;
            }
            let index = this.state.itemIndex;
            const items = this.state.arrangement.items;
            // Transition to next item in the arrangement
            setTimeout(() => {
                index++;
                if(index >= items.length) {
                    this.loadArrangment();
                }
                else {
                    this.setStateIfComponentIsMounted({ itemIndex: index });
                }
            }, items[index].duration * 1000);
        }

        loadArrangment() {
            const url = `${this.props.apiBaseUrl}/arrangements/${this.props.arrangement}`;
            return fetch(url)
                .then((result) => {
                    if (!result.ok) {
                        throw `Error getting result from API\n(fetching ${url})`;
                    }
                    result.json().then((data) => {
                        if (data.items.length < 1) {
                            this.setStateIfComponentIsMounted({
                                hasLoaded: true,
                                error: 'Empty arrangment',
                            });
                        } else {
                            this.setStateIfComponentIsMounted({
                                hasLoaded: true,
                                arrangement: data,
                                error: null,
                                itemIndex: 0,
                            });
                        }
                    });
                })
                .catch((error) => this.setStateIfComponentIsMounted({
                    hasLoaded: true,
                    error
                }));
        }

        renderCurrentItem() {
            const baseUrl = `${this.props.apiBaseUrl}/arrangements/${this.props.arrangement}/`
            const index = this.state.itemIndex;
            const item = this.state.arrangement.items[index];
            let activeElement = null;
            const contentProps = { src: baseUrl + item.file };
            const videoProps = { muted: true, autoPlay: true, loop: true };
            if(item.type == 'image') {
                activeElement = e('img', contentProps);
            }
            else if(item.type == 'video') {
                activeElement = e('video', videoProps, e('source', contentProps));
            }
            else {
                activeElement = e(ErrorMessage, { message: `Invalid item type at index ${ index }` });
            }
            return activeElement;
        }

        render() {
            const { error, hasLoaded } = this.state;
            if (error) {
                return e(ErrorMessage, { message: error });
            }
            else if (hasLoaded) {
                return this.renderCurrentItem();
            }
            else {
                return e(LoadingScreen);
            }
        }
    }

    module.exports = Arrangement;
});
