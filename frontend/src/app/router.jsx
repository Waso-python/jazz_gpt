import {createBrowserRouter, Navigate} from "react-router-dom";

import Error from "@pages/error";
import {Home} from "@pages/home";


const router = createBrowserRouter([
    {
        element: <Home/>,
        errorElement: <Error/>,
        path: '/',
    },
    {
        path: '*',
        element: <Navigate to='/' replace={true}/>,
        errorElement: <Error/>
    }
]);

export default router;
