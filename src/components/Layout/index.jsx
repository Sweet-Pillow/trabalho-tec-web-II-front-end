import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
	const history = useNavigate();

	return (
		<div className="h-screen w-screen overflow-hidden">
			<header className="shadow-xl h-[90px] border-b-2 border-gray-300 w-full">
			</header>

			{/* <main className="flex flex-row h-full">
				<section className="border-r-2 border-gray-300 border-solid h-full w-1/4">
				</section> */}
			<div className="overflow-auto max-h-full">
				<Outlet />
			</div>

			{/* </main> */}
		</div>
	)
}