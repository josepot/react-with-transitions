import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const FirstChild = props =>
  React.Children.toArray(props.children)[0] || null;

export const STATES = Object.freeze({
  NORMAL: 'NORMAL',
  INIT: 'INIT',
  ENDING: 'ENDING',
});

export default (renderCondition, msOut) => (Component) => {
  class WithTransitions extends React.Component {
    constructor(props, ctx) {
      super(props, ctx);
      this.state = { state: STATES.NORMAL };
    }

    componentWillEnter(callback) {
      this.setState({ state: STATES.INIT }, () => setImmediate(callback));
    }

    componentDidEnter() {
      this.setState({ state: STATES.NORMAL });
    }

    componentWillLeave(callback) {
      this.setState({ state: STATES.ENDING }, () => setTimeout(callback, msOut));
    }

    render() {
      return <Component {...this.props} transitionState={this.state.state} />;
    }
  }

  return props =>
    <TransitionGroup component={FirstChild}>
      {renderCondition(props) ? <WithTransitions {...props} /> : null}
    </TransitionGroup>;
};
