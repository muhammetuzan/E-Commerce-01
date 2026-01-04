import { configureStore } from "@reduxjs/toolkit";

// Geçici placeholder reducer
const dummyReducer = (state = {}) => state;

const store = configureStore({
	reducer: {
		app: dummyReducer,
		// Diğer reducer'lar buraya eklenecek
	},
});

export default store;
