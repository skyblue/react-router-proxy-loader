module.exports = function(React, assign, desc) {
    desc.displayName = "ReactProxy";
    desc.render = function() {
        var Component = this.state.component;
        if(Component) {
            return React.createElement(Component, assign({ref: "componentProxy"}, this.props), this.props.children);
        } else if(this.renderUnavailable) {
            return this.renderUnavailable();
        } else {
            return null;
        }
    };
    desc.getInitialState = function() {
        return { component: this.loadComponent() };
    };
    desc.componentDidMount = function() {
        if(!this.state.component) {
            this.loadComponent(function(component) {
                this.setState({ component: component });
            }.bind(this));
        }
    };
};
