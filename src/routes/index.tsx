import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../views/index";
import MovieDetailComponent from "../views/detail";

let routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent></HomeComponent>,
    },
    {
        path: '/:id',
        element: <MovieDetailComponent></MovieDetailComponent>,
    },
])

export default routes;