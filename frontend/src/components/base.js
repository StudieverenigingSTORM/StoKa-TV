'use strict';

define(function (require, exports, module) {
    const React = require('react');

    class BaseComponent extends React.Component {
        constructor(props) {
            super(props);
            this.isComponentMounted = false;
        }

        componentDidMount() {
            this.isComponentMounted = true;
        }
          
        componentWillUnmount() {
            this.isComponentMounted = false;
        }

        setStateIfComponentIsMounted(state, callback) {
            if(this.isComponentMounted) {
                this.setState(state, callback);
            }
        }
    }

    module.exports = BaseComponent;
});