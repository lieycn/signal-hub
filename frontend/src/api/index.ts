import { createAlova } from "alova"
import { createServerTokenAuthentication } from "alova/client"
import adapterFetch from "alova/fetch"
import solidHook from "alova/solid"

import { LOGIN_PAGE } from "@/constants/system.ts"
import { authState, setAuthState } from "@/store/auth.ts"

const apiUrl = import.meta.env.VITE_API_URL || "/"
const url = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
	typeof solidHook
>({
	assignToken: (method) => {
		method.config.headers.authorization = "Bearer " + authState.token
	},
	refreshTokenOnError: {
		isExpired: (error) => {
			return error.response.status === 401
		},
		handler: async (error) => {
			console.log(error)
		},
	},
	refreshTokenOnSuccess: {
		isExpired: (response) => {
			return response.status === 401
		},
		handler: async () => {
			// todo refresh token
			setAuthState({ token: "" })
			const currentPath = window.location.pathname + window.location.search
			window.location.replace(`${LOGIN_PAGE}?redirect=${encodeURIComponent(currentPath)}`)
		},
	},
})

export const alova = createAlova({
	baseURL: `${url}/api/v1`,
	cacheFor: null,
	requestAdapter: adapterFetch(),
	statesHook: solidHook,
	beforeRequest: onAuthRequired(),
	responded: onResponseRefreshToken({
		onSuccess: async (res) => {
			if (res.status === 204) {
				return Promise.resolve()
			}
			const data = await res.json()

			if (res.status > 205) {
				// useNotification.getState().notification?.error({
				// 	title: "Server Error",
				// 	description: data.message,
				// })
				return Promise.reject(data.message)
			}

			return data
		},
	}),
})
