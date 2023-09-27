import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../views/index";

let routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent></HomeComponent>,
    },
])

export default routes;