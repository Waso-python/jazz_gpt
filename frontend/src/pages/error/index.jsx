import {useRouteError} from 'react-router-dom';

import ErrorPage from "@components/errorPage"

const Error = ({error = {}}) => {
    const routeError = useRouteError();

    return <ErrorPage error={routeError || error}/>
}

export default Error;