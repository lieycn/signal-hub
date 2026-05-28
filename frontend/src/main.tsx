import { RouterProvider } from "@tanstack/solid-router"
/* @refresh reload */
import { render } from "solid-js/web"

import { router } from "./router"

import "./assets/styles/style.css"

import "./plugins/dayjs"

const root = document.getElementById("root")

render(() => <RouterProvider router={router} />, root!)
