import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider, useSelector } from "react-redux";

import gameReducer from '../redux/reducers/game';
import View from './View';

const rootReducer = combineReducers({
	game: gameReducer,
});
const store = createStore(rootReducer);

export default function App() {
	return (
	  <Provider store={store}>
		<View />
	  </Provider>
	);
  }
