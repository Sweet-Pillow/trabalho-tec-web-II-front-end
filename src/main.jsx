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

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: "/home",
				element: <Home />
			},
			{
				path: "/questions/:id",
				element: <Home />
			},

		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
