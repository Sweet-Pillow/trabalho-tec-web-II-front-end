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
  const [newAnswer, setNewAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votedAnswerId, setVotedAnswerId] = useState(null); // Para armazenar o ID da resposta votada

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/questions/${id}`);
        // Ordenar respostas por quantidade de votos (em ordem decrescente)
        const sortedAnswers = response.data.answers.sort(
          (a, b) => b.votesAmmount - a.votesAmmount
        );
        setQuestion({
          ...response.data,
          answers: sortedAnswers,
        });
      } catch (error) {
        console.error("Erro ao buscar a pergunta:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleVote = async (answerId) => {
    if (votedAnswerId) {
      alert("Você já votou em uma resposta.");
      return;
    }

    try {
      await api.post(`/answers/${answerId}/vote`);
      // Atualizar o ID da resposta votada
      setVotedAnswerId(answerId);

      // Recarregar a questão após o voto
      const response = await api.get(`/questions/${id}`);
      const sortedAnswers = response.data.answers.sort(
        (a, b) => b.votesAmmount - a.votesAmmount
      );
      setQuestion({
        ...response.data,
        answers: sortedAnswers,
      });
    } catch (error) {
      console.error("Erro ao votar na resposta:", error);
    }
  };

  const handleSubmit = async () => {
    if (!newAnswer.trim()) return; // Não enviar se o campo estiver vazio

    setIsSubmitting(true);
    try {
      await api.post(`/answers/${id}`, { content: newAnswer });
      // Recarregar a questão após o envio
      const response = await api.get(`/questions/${id}`);
      const sortedAnswers = response.data.answers.sort(
        (a, b) => b.votesAmmount - a.votesAmmount
      );
      setQuestion({
        ...response.data,
        answers: sortedAnswers,
      });
      setNewAnswer(""); // Limpar o campo de resposta
    } catch (error) {
      console.error("Erro ao postar a resposta:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar a pergunta.</p>;
  if (!question) return <p>Pergunta não encontrada.</p>;

  const { title, content, tags, createdAt, author, answers } = question;

  return (
    <div className="max-w-[900px] px-6 py-8 md:px-10 flex flex-col">
      <div className="px-6 py-8 md:py-8 flex flex-col gap-4 border-b border-gray-200 bg-gray-100 rounded-lg mb-6">
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

      <div className="text-lg font-semibold mb-4">
        <p>{answers.length} Resposta(s)</p>
      </div>

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          votes={answer.votesAmmount || 0}
          userName={answer.author?.name || "Desconhecido"}
          createData={new Date(answer.createdAt).toLocaleDateString()}
          answer={answer.content}
          onVote={() => handleVote(answer.id)}
        />
      ))}

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
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></textarea>
        <button
          type="button"
          className={`mt-2 ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600"
          } text-white rounded px-4 py-2 hover:${
            isSubmitting ? "bg-gray-400" : "bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Responder"}
        </button>
      </div>
    </div>
  );
}
