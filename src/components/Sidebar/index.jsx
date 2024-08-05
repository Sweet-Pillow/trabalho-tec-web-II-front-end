// src/components/Sidebar/index.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#e0f2f1] text-gray-800">
      <ul className="space-y-4 p-4">
        <li>
          <Link
            to="/profile"
            className="block p-3 rounded-lg hover:bg-teal-100 transition-colors duration-300"
          >
            Perfil
          </Link>
        </li>
        <li>
          <span className="block p-3 cursor-not-allowed rounded-lg bg-teal-200 opacity-50">
            Minhas Questions
          </span>
        </li>
        <li>
          <span className="block p-3 cursor-not-allowed rounded-lg bg-teal-200 opacity-50">
            Minhas Respostas
          </span>
        </li>
        <li>
          <Link
            to="/"
            className="block p-3 rounded-lg hover:bg-teal-100 transition-colors duration-300"
          >
            Todas as Questões
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
