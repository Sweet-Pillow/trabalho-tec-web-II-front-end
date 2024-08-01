import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
	const history = useNavigate();

	return (
		<div className="h-screen w-screen overflow-hidden">
			<header className="shadow-xl h-[90px] border-b-2 border-gray-300 w-full fixed top-0 bg-slate-100">
			</header>

			<main className="flex flex-row h-full">
				<nav className="border-r-2 border-gray-300 border-solid w-1/6 h-full bg-slate-100 fixed left-0 -z-10">
				</nav>
				<div className="w-full ml-80 mt-24 overflow-auto">
					<Outlet />
				</div>

			</main>
		</div>
	)
}