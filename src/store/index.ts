import { configureStore } from "@reduxjs/toolkit";

export type ReduxState = unknown;

const store = configureStore({
	reducer: {},
});

export default store;
