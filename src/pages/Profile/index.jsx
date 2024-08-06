import { useState, useEffect } from "react";
import { FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import api from "../../lib/api";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return <div className="text-center mt-8 text-gray-500">Carregando...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Erro ao carregar o perfil.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">
          Perfil do Usuário
        </h2>
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          {userData.name}
        </h3>
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-700 flex items-center mb-2">
            <FaEnvelope className="mr-2 text-green-600" />
            {userData.email}
          </p>
          <p className="text-md text-gray-600 mb-8">
            Membro desde {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
