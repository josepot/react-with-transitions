# react-with-transitions

A Higher Order Component that can be very useful if you are using a css-in-js
library like [`styletron`](http://styletron.js.org/) or [`styled-components`](https://styled-components.com/).

## API

### `withTransitions(renderCondition, msOut)` (default export)
It returns a Higher Order React Component Function that will add the property
`transitionState` to the enhanced-component. The possible values of the property
`transitionState` are:

- `INIT`: indicates that the DOM component just got rendered, so that we can apply the initial styles.
- `NORMAL`: indicates that the component is the INIT stage has finished, the component is now being rendered normally. So that we can apply the standard styles.
- `ENDING`: indicates that the timeout for destroying the component has started, so that we can apply the styles that we want for the “ending” stage.

**Arguments**

#### - `renderCondition` (Function):
This function receives the properties of the component. Returning a truthy value
will indicate that the Component to be enhanced should be rendered.

#### - `msOut` (Number):
The number of milliseconds that it will take since the moment when the Component
was rendered until it is destroyed. In other words: the number of milliseconds
of the `ENDING` stage.

### `STATES` (Object)
An object with the possible values of the `transitionState` property (`INIT`, `NORMAL` and `ENDING`)

## Usage

### With `styletron`:

```js
import PropTypes from 'prop-types';
import React from 'react';
import withTransitions, { STATES } from 'react-with-transitions';
import { styled } from 'styletron-react';

const OpacityWrapper = styled('div', ({ transitionState }) => ({
  opacity: transitionState === STATES.NORMAL ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
}));

OpacityWrapper.propTypes = {
  transitionState = PropTypes.oneOf(Object.keys(STATES)),
};

const FaddingWrapper =
  withTransitions(({ isVisible }) => isVisible === true, 300)(OpacityWrapper);

FaddingWrapper.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default FaddingWrapper;
```
