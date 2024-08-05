import { useNavigate, NavLink, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon
import api from "../../lib/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Layout() {
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);
	const [listOpen, setListOpen] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await api.get("/users/me");
				setUserData(response.data.user);
			} catch (err) {
				console.error("Erro ao carregar os dados do usuário:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();

	}, []);

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/login");
	};

	const List = () => {
		return (
			<div className="absolute right-0 border rounded border-gray-300 transition-all bg-white p-2 mt-2">
				<p className="border-b border-gray-200 text-base text-center text-nowrap">Ola,&nbsp;{userData?.name}</p>
				<p className="text-base text-nowrap">{userData?.email}</p>
			</div>
		)
	}

	return (
		<div className="h-screen w-screen overflow-hidden">
			<header className="flex flex-row justify-end items-center p-5 pr-7 gap-4 shadow-xl h-[90px] border-b-2 border-gray-300 w-full fixed top-0 bg-orange-50">
				<svg className="transition-colors p-1 rounded-full cursor-pointer hover:bg-orange-200 duration-300 ease-in-out fill-black" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M180-204.62v-59.99h72.31v-298.47q0-80.69 49.81-142.69 49.8-62 127.88-79.31V-810q0-20.83 14.57-35.42Q459.14-860 479.95-860q20.82 0 35.43 14.58Q530-830.83 530-810v24.92q78.08 17.31 127.88 79.31 49.81 62 49.81 142.69v298.47H780v59.99H180Zm300-293.07Zm-.07 405.38q-29.85 0-51.04-21.24-21.2-21.24-21.2-51.07h144.62q0 29.93-21.26 51.12-21.26 21.19-51.12 21.19Zm-167.62-172.3h335.38v-298.47q0-69.46-49.11-118.57-49.12-49.12-118.58-49.12-69.46 0-118.58 49.12-49.11 49.11-49.11 118.57v298.47Z" /></svg>

				<div className=" relative">
					<div 
						tabIndex={0}
						onClick={() => setListOpen(!listOpen)} 
						onBlur={() => setListOpen(false)}
						className="bg-violet-400 hover:bg-violet-500 flex items-center justify-center cursor-pointer min-h-full  rounded-full border border-black h-14 w-14 transition-colors duration-300 ease-in-out">
						<p className="font-medium text-3xl antialiased">{userData?.name[0]}</p>
					</div>
					{listOpen && <List />}

				</div>
			</header>

			<main className="flex flex-row h-full">
				<nav className="border-r-2 border-gray-300 border-solid w-1/6 h-full bg-orange-50 fixed left-0 top-[90px]">
					<ul className="space-y-4 p-4">
						<li className="w-full">
							<NavLink
								to="/profile"
								className="block w-full text-lg font-semibold text-gray-800 hover:text-orange-700 hover:bg-orange-200 focus:bg-orange-200 transition-colors duration-300 ease-in-out rounded p-2"
							>
								Perfil
							</NavLink>
						</li>
						<li className="w-full">
							<span className="block w-full text-lg font-medium text-gray-500 cursor-not-allowed hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded p-2">
								Minhas Questions
							</span>
						</li>
						<li className="w-full">
							<span className="block w-full text-lg font-medium text-gray-500 cursor-not-allowed hover:bg-gray-200 transition-colors duration-300 ease-in-out rounded p-2">
								Minhas Respostas
							</span>
						</li>
						<li className="w-full">
							<NavLink
								to="/"
								className="block w-full text-lg font-semibold text-gray-800 hover:text-orange-700 hover:bg-orange-200 focus:bg-orange-200 transition-colors duration-300 ease-in-out rounded p-2"
							>
								Perguntas
							</NavLink>
						</li>
						<li className="w-full">
							<button
								onClick={handleLogout}
								className="w-full text-lg font-semibold text-gray-800 hover:text-red-600 hover:bg-red-200 focus:bg-red-200 transition-colors duration-300 ease-in-out flex items-center rounded p-2"
							>
								<FiLogOut className="mr-2" /> Sair
							</button>
						</li>
					</ul>
				</nav>
				<div className="w-full ml-[16.6667%] mt-24 overflow-auto bg-white p-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
