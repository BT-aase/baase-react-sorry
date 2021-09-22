import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import gameReducer from '../redux/reducers/game';
import Board from "./Board";

const rootReducer = combineReducers({
	game: gameReducer,
});
const store = createStore(rootReducer);

export default function App() {
	return (
	  <Provider store={store}>
		<Board />
	  </Provider>
	);
  }
