import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './error-page';
import LayoutComponent from './LayoutComponent';
import HomePage from './routes/HomePage';
import SavePage from './routes/SavePage';
import FetchPage from './routes/FetchPage';
import store from './redux/store';
import { Provider } from 'react-redux';


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
          element: <SavePage />,
        },
        {
          path: "fetch",
          element: <FetchPage />,
        },
      ]
    },
  ]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}