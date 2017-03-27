Redux-effect-handler
====================

Simple effect handler middleware for redux. This simply cuts through the levels
of abstraction required to create your own simple middleware for handling
asynchronous actions.

Installation
------------

```
npm install redux-effect-handler
```

Usage
-----

```
import { createEffectHandler } from 'redux-effect-handler';
import { createStore, applyMiddleware } from 'redux';

const initialState = {};

const effectHandler = createEffectHandler(async function (store, action) {
  if (action.type == 'LOAD_USERS') {
    store.dispatch({type: 'LOADING'});
    const users = await fetch('/api/users');
    store.dispatch({type: 'USERS_LOADED', payload: users});
    store.dispatch({type: 'LOAD_END'});
  }
});

export default createStore(reducer, initialState, applyMiddleware(effectHandler));

```

This can easily be combined with the `redux-actions` library for convenience:

```
import { handleActions } from 'redux-actions';
import { createEffectHandler } from 'redux-effect-handler';

async function addUser (store, action) {
  ...
}

export default createEffectHandler(handleActions({
  [actions.ADD_USER]: addUser
});
```