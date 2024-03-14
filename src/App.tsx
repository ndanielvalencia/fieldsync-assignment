import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './error-page';
import LayoutComponent from './LayoutComponent';
import HomePage from './routes/HomePage';
import Save from './routes/Save';
import Fetch from './routes/Fetch';


const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutComponent/>,
      errorElement: <ErrorPage />,
      children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
          path: "save",
          element: <Save />,
        },
        {
          path: "fetch",
          element: <Fetch />,
        },
      ]
    },
  ]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}