import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/index";
import api from "../../lib/api";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [titleFilter, setTitleFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const fetchQuestions = (title = "", tag = "") => {
    api
      .get("/questions", { params: { name: title, tag } })
      .then((response) => {
        const questionsData = response.data;
        setQuestions(questionsData);

        const total = questionsData.reduce(
          (acc, question) => acc + question.answers.length,
          0
        );
        setTotalAnswers(total);
      })
      .catch((error) => {
        console.error("Erro ao buscar as perguntas:", error);
        setQuestions([]);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFilter = () => {
    fetchQuestions(titleFilter, tagFilter);
  };

  return (
    <div>
      <h1>Lista de Perguntas</h1>
      <div className='flex items-center gap-2'>
  <input
    type="text"
    value={titleFilter}
    onChange={(e) => setTitleFilter(e.target.value)}
    placeholder="Buscar por título"
    className="border border-gray-300 rounded px-2 py-1"
  />
  <select
    value={tagFilter}
    onChange={(e) => setTagFilter(e.target.value)}
    className="border border-gray-300 rounded px-2 py-1"
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
    className="bg-green-300 text-gray-800 rounded px-4 py-2 hover:bg-green-400"
  >
    Filtrar
  </button>
</div>


      {questions.length === 0 ? (
        <p>Nenhum resultado encontrado</p>
      ) : (
        <>
          <p>Total de Respostas: {totalAnswers}</p>
          {questions.map((question) => (
            <div key={question.id} className="flex flex-row w-full border-y-2">
              <div className="py-5 text-sm flex flex-col h-full w-2/12 text-nowrap gap-2 text-right">
                <p>{question.votes || 0} Votos</p>
                <p>{question.answers.length || 0} Respostas</p>
              </div>
              <div className="pl-5 py-4 flex flex-col gap-2 w-2/4">
                <Link
                  to={"/question/" + question.id}
                  className="text-lg text-blue-600 hover:text-blue-800"
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
                    <p className="text-xs">
                      Criado por: {question.author?.name || "Desconhecido"} em{" "}
                      {new Date(question.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
