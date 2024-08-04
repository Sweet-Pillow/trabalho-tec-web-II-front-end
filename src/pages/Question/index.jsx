import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "../../components/Tag/index";
import Answer from "../../components/Answer/index";
import api from "../../lib/api";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/questions/${id}`)
      .then((response) => {
        setQuestion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar a pergunta:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar a pergunta.</p>;
  if (!question) return <p>Pergunta não encontrada.</p>;

  const { title, content, tags, createdAt, author, answers } = question;

  return (
    <div className="max-w-[900px] px-6 py-8 md:px-10 flex flex-col">
      {/* Seção da pergunta */}
      <div className="px-6 py-8 md:py-8 flex flex-col gap-4  border-b border-gray-200 bg-gray-100 rounded-lg mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="flex flex-row justify-between text-sm text-gray-600 mb-4">
          <p>
            Perguntado por:{" "}
            <span className="font-semibold">
              {author?.name || "Desconhecido"}
            </span>
          </p>
          <p>Criado em: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <p className="text-base md:text-lg">{content}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {(tags || "").split(",").map((tagName, index) => (
            <Tag key={index} title={tagName} />
          ))}
        </div>
      </div>

      {/* Seção de respostas */}
      <div className="text-lg font-semibold mb-4">
        <p>{answers.length} Resposta(s)</p>
      </div>

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          votes={answer.votes || 0}
          userName={answer.author?.name || "Desconhecido"}
          createData={new Date(answer.createdAt).toLocaleDateString()}
          answer={answer.content}
        />
      ))}

      {/* Seção de postar resposta */}
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-6">
        <label htmlFor="answer" className="text-lg font-semibold mb-2">
          Escrever uma resposta
        </label>
        <textarea
          name="answer"
          rows={4}
          cols={1}
          className="resize-none border border-gray-300 rounded-lg w-full px-2 py-1 text-base focus:border-blue-500 focus:ring-1 placeholder:text-sm"
          placeholder="Escreva sua resposta aqui..."
        ></textarea>
        <button
          type="button"
          className="mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Responder
        </button>
      </div>
    </div>
  );
}
