import { useNavigate, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon
import Cookies from "js-cookie";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <header className="shadow-xl h-[90px] border-b-2 border-gray-300 w-full fixed top-0 bg-orange-50">
        {/* Header content here */}
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
                className="block w-full text-lg font-semibold text-gray-800 hover:text-red-600 hover:bg-red-200 focus:bg-red-200 transition-colors duration-300 ease-in-out flex items-center rounded p-2"
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
