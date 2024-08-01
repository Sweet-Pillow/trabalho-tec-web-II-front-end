import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css'
import Error from "./pages/Error/index"
import Layout from './components/Layout/index';
import Home from './pages/Home/index';
import Ask from './pages/Ask/index';
import Redirect from './pages/Redirect';
import Question from './pages/Question/index';
import Login from './pages/Login';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: "/*",
				element: <Redirect />
			},
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/question/:id?",
				element: <Question />
			},
			{
				path: "/ask",
				element: <Ask />
			},

		]
	},
	{
		path: "/login",
		element: <Login />
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
