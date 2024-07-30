import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const history = useNavigate();

    return (
        <div className="flex flex-col h-screen">
            <header className="shadow-xl h-[90px] flex justify-between border-b-2 border-gray-300">
            </header>

            <main className="flex flex-row h-full">
				<section className="border-r-2 border-gray-300 border-solid h-full w-1/4">
				</section>
                <Outlet />
            </main>
        </div>
    )
}