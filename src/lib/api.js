import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: "http://localhost:3333",
});

api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// if (error.response?.status === 401 && !originalRequest._retry) {
		//   originalRequest._retry = true;
		//   return Promise.reject(error);
		// }

		if (error.response.status === 401) {
			// Redirect to login page if unauthorized
			window.location.href = '/login';
		}
		
		return Promise.reject(error);
	}
);

export default api;
