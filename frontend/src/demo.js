'use strict';

// TODO delete file later

define(function (require, exports, module) {
    const React = require('react');
    const ReactDom = require('react-dom');
    const e = React.createElement;

    const config = require('config');

    class Demo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                hasLoaded: false,
                content: null,
            }
        }

        componentDidMount() {
            fetch(`${config.apiBaseUrl}/arrangements`)
                .then((result) => {
                    if (!result.ok) {
                        throw 'Error getting result from API';
                    }
                    result.json().then((data) => {
                        this.setState({
                            hasLoaded: true,
                            content: data,
                        });
                    })
                })
                .catch((error) => this.setState({
                    hasLoaded: true,
                    error
                }));
        }

        render() {
            const { error, hasLoaded, content } = this.state;
            var text = 'Calling API...';
            if (error) {
                text = `Something went wrong: ${error}`;
            }
            else if (hasLoaded) {
                text = `API returned: ${JSON.stringify(content)}`;
            }
            return e('div', null, [
                e('h1', { key: 'header' }, 'Demo'),
                e('p', { key: 'text' }, text),
            ]);
        }
    }

    module.exports = Demo;
});
