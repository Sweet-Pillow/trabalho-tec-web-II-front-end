import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import Tag from "../../components/Tag";

export default function UserQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [userId, setUserId] = useState(null); // Armazenar o ID do usuário
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Faz a requisição para obter os dados do usuário logado
        const response = await api.get("/users/me");
        const user = response.data.user;
        setUserId(user.id); // Armazena o ID do usuário logado
      } catch (err) {
        console.error("Erro ao carregar os dados do usuário:", err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchQuestions(currentPage);
    }
  }, [currentPage, titleFilter, tagFilter, userId]);

  const fetchQuestions = async (page) => {
    try {
      const response = await api.get(`/questions`, {
        params: {
          page,
          name: titleFilter,
          tag: tagFilter,
          authorId: userId, // Passa o ID do usuário na requisição
        },
      });
      const questionsData = response.data.questions;
      const totalPages = response.data.totalPages;

      setQuestions(questionsData);
      setTotalPages(totalPages);

      const total = questionsData.reduce(
        (acc, question) => acc + question.answers.length,
        0
      );
      setTotalAnswers(total);

      updateVisiblePages(page, totalPages);
    } catch (error) {
      console.error("Erro ao buscar as perguntas:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateVisiblePages = (page, total) => {
    const pages = [];
    const startPage = Math.floor((page - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, total);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setVisiblePages(pages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
        Minhas Perguntas
      </h1>
      <div className="flex justify-center items-center gap-4 mb-6">
        <input
          type="text"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          placeholder="Buscar por título"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Selecionar Tag</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="C">C</option>
          <option value="Rust">Rust</option>
          <option value="JavaScript">JavaScript</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600 transition duration-300"
        >
          Filtrar
        </button>
      </div>
      {questions.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum resultado encontrado</p>
      ) : (
        <>
          <p className="text-center text-gray-700 mb-4">
            Total de Respostas: {totalAnswers}
          </p>
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex flex-row w-full border-b border-gray-200 bg-white mb-4 p-4 rounded-lg shadow"
            >
              <div className="py-2 text-sm flex flex-col h-full w-2/12 text-right text-gray-600 gap-1">
                <p>{question.votes || 0} Votos</p>
                <p>{question.answers.length || 0} Respostas</p>
              </div>
              <div className="pl-5 py-2 flex flex-col gap-2 w-3/4">
                <Link
                  to={"/question/" + question.id}
                  className="text-xl font-semibold text-green-800 hover:text-green-900 transition duration-300"
                >
                  {question.title}
                </Link>
                <div className="flex justify-between">
                  <div className="flex flex-row gap-x-2">
                    {(question.tags || "").split(",").map((tagName, index) => (
                      <Tag key={index} title={tagName} />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">
                      Criado por: {question.author?.name || "Desconhecido"} em{" "}
                      {new Date(question.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 disabled:bg-gray-200"
            >
              Anterior
            </button>
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  page === currentPage
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } rounded-lg px-4 py-2 transition duration-300`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 disabled:bg-gray-200"
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
