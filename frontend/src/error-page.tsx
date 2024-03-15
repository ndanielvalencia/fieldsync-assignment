// Source: https://github.com/remix-run/react-router/discussions/9628

import { useRouteError, isRouteErrorResponse } from "react-router-dom";


export default function ErrorPage() {

    interface RouterError extends Error {}

    const error = useRouteError();

    
    function isRouterError(object: any): object is RouterError {
        return 'message' in object;
    }
    
    function errorMessage(error: unknown): string {
        if (isRouteErrorResponse(error)) {
            return `${error.status} ${error.statusText}`
        } else if (error !== undefined && isRouterError(error)) {
            return error.message;
        } else if (typeof error === 'string') {
            return error
        } else {
            console.error(error)
            return 'Unknown error'
        }
    } 

    return (
        <div id='error-page' className='flex flex-col gap-8 justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-slate-400'>
            <i>{errorMessage(error)}</i>
        </p>
        </div>
    );
}