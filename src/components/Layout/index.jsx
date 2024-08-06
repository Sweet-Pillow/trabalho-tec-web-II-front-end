import { useNavigate, NavLink, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FiLogOut, FiBell } from "react-icons/fi"; // Import logout and notification icons
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
      <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 transition-all">
        <div className="px-4 py-2 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            Olá, {userData?.name}
          </p>
        </div>
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500">{userData?.email}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <header className="flex justify-between items-center p-5 pr-7 h-[90px] shadow-lg border-b w-full bg-gradient-to-r from-green-50 to-green-100 fixed top-0 z-10">
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18m9-9H3"
              />
            </svg>
          </div>

          {/* Logo Title */}
          <Link
            to="/"
            className="text-3xl font-bold text-gray-800 tracking-tight"
          >
            <span className="text-green-600">Code</span>
            <span className="text-gray-700">Sphere</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <FiBell className="h-8 w-8 text-gray-700 cursor-pointer hover:text-green-600 transition-colors duration-300 ease-in-out" />
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <div
              tabIndex={0}
              onClick={() => setListOpen(!listOpen)}
              onBlur={() => setListOpen(false)}
              className="bg-green-400 hover:bg-green-500 flex items-center justify-center cursor-pointer rounded-full h-12 w-12 transition-colors duration-300 ease-in-out"
            >
              <p className="font-medium text-xl text-white">
                {userData?.name[0]}
              </p>
            </div>
            {listOpen && <List />}
          </div>
        </div>
      </header>

      <main className="flex flex-row w-full">
        <nav className="w-1/6 h-full bg-green-100 border-r-2 border-gray-300 fixed top-[90px] flex flex-col justify-between">
          <ul className="space-y-4 p-4">
            <li>
              <NavLink
                to="/profile"
                className="block text-lg font-semibold text-gray-800 hover:text-green-700 hover:bg-green-200 transition-colors duration-300 ease-in-out rounded p-2"
              >
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-questions"
                className="block text-lg font-semibold text-gray-800 hover:text-green-700 hover:bg-green-200 transition-colors duration-300 ease-in-out rounded p-2"
              >
                Minhas Perguntas
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/home"
                className="block text-lg font-semibold text-gray-800 hover:text-green-700 hover:bg-green-200 transition-colors duration-300 ease-in-out rounded p-2"
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
        <div className="w-full ml-[16.6667%] mt-[90px] overflow-auto bg-white p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
