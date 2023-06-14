// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Root from './routes/root';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Movie, { loader as movieLoader } from "./routes/movie"
import ErrorPage from "./error_page";
import './index.css'
import SearchResults from "./routes/results"
import store, { history } from './app/store'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from "connected-react-router"
// import {AppContainer} from 'react-hot-loader'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "results",
        element: <SearchResults />
      },
      {
        path: "movies/:movieId",
        element: <Movie />,
        loader: movieLoader
      }
    ]
  },
  // { errorElement: <ErrorPage />, path: "movies/:movieId", element: <Movie />, loader: movieLoader }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>
);
