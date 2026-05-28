import { createStore } from "solid-js/store"

export const [authState, setAuthState] = createStore({
	token: "",
})
