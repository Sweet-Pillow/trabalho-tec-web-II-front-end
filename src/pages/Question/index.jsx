import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Vote from "../../components/Vote/index";
import Tag from "../../components/Tag/index";
import Answer from "../../components/Answer/index";
import api from "../../lib/api";
import Cookies from "js-cookie";

export default function QuestionDetail() {
  const { id } = useParams(); // Obtém o ID da pergunta da URL
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(id);

  useEffect(() => {
    // Faz a requisição para obter a pergunta e suas respostas
    api
      .get(`/questions/${id}`)
      .then((response) => {
        setQuestion(response.data); // Armazena a pergunta no estado
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar a pergunta:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]); // O efeito será reexecutado quando o ID mudar

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar a pergunta.</p>;
  if (!question) return <p>Pergunta não encontrada.</p>;

  const { title, content, tags, createdAt, author, answers } = question;

  return (
    <div className="w-full px-10 flex flex-col">
      {/* Início seção da pergunta */}
      <div className="py-9 flex flex-col justify-start gap-2 border-b border-gray-300">
        <h1 className="text-[2rem]">{title}</h1>

        <div className="flex flex-row gap-5">
          <div className="flex flex-row text-xs">
            <p className="text-gray-700">Perguntado por:&nbsp;</p>
            <p>{author?.name || "Desconhecido"}</p>
          </div>
          <div className="flex flex-row text-xs">
            <p className="text-gray-700">Criado em:&nbsp;</p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row py-4">
        <Vote votes={question.votes || 0} />

        <div className="px-10 flex flex-col gap-y-6">
          <p className="text-lg">{content}</p>
          <div className="flex flex-row gap-x-2">
            {(tags || "").split(",").map((tagName, index) => (
              <Tag key={index} title={tagName} />
            ))}
          </div>
        </div>
      </div>

      {/* Fim seção da pergunta */}

      <div className="flex flex-row mt-6 mb-3 text-[1.3rem]">
        <p>{answers.length}&nbsp;</p>
        <p> Resposta(s)</p>
      </div>

      {/* Início seção de visualizar respostas */}

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          votes={answer.votes || 0}
          userName={answer.author?.name || "Desconhecido"}
          createData={new Date(answer.createdAt).toLocaleDateString()}
          answer={answer.content}
        />
      ))}

      {/* Fim seção de visualizar respostas */}

      {/* Início seção de postar resposta */}

      <div className="flex flex-col gap-1 border-t border-gray-300 mb-4 mt-8">
        <label htmlFor="answer" className="text-[1.3rem] py-4">
          Escrever uma resposta
        </label>
        <textarea
          name="answer"
          rows={4}
          cols={1}
          className="resize-none focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1"
        ></textarea>
        <button
          type="button"
          className="mt-2 bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700"
        >
          Responder
        </button>
      </div>

      {/* Fim seção de postar resposta */}
    </div>
  );
}
