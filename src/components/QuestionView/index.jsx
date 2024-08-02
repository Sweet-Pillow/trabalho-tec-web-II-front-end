import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/index";
import api from "../../lib/api";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);

  useEffect(() => {
    api
      .get("/questions")
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
      });
  }, []);

  return (
    <div>
      <h1>Lista de Perguntas</h1>
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
    </div>
  );
}
