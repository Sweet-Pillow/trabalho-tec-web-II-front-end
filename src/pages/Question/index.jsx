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

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/questions/${id}`);
        const sortedAnswers = response.data.answers.sort(
          (a, b) => b.votesAmount - a.votesAmount
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

  const handleSubmit = async () => {
    if (!newAnswer.trim()) return;

    setIsSubmitting(true);
    try {
      await api.post(`/answers/${id}`, { content: newAnswer });
      const response = await api.get(`/questions/${id}`);
      const sortedAnswers = response.data.answers.sort(
        (a, b) => b.votesAmount - a.votesAmount
      );
      setQuestion({
        ...response.data,
        answers: sortedAnswers,
      });
      setNewAnswer("");
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
      <div className="px-6 py-8 md:py-8 flex flex-col gap-4 border-b border-gray-200 bg-gray-50 rounded-lg mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          {title}
        </h1>
        <div className="flex flex-row justify-between text-sm text-gray-600 mb-4">
          <p>
            Perguntado por:{" "}
            <span className="font-semibold">
              {author?.name || "Desconhecido"}
            </span>
          </p>
          <p>Criado em: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <p className="text-base md:text-lg text-gray-800">{content}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {(tags || "").split(",").map((tagName, index) => (
            <Tag key={index} title={tagName} />
          ))}
        </div>
      </div>

      <div className="text-lg font-semibold mb-4 text-green-700">
        <p>{answers.length} Resposta(s)</p>
      </div>

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          id={answer.id}
          votes={answer.votesAmount || 0}
          userName={answer.author?.name || "Desconhecido"}
          createData={new Date(answer.createdAt).toLocaleDateString()}
          answer={answer.content}
          onVote={(newVoteCount) => {
            const updatedAnswers = answers.map((ans) =>
              ans.id === answer.id ? { ...ans, votesAmount: newVoteCount } : ans
            );
            setQuestion((prev) => ({
              ...prev,
              answers: updatedAnswers.sort(
                (a, b) => b.votesAmount - a.votesAmount
              ),
            }));
          }}
        />
      ))}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-6">
        <label
          htmlFor="answer"
          className="text-lg font-semibold text-green-700 mb-2"
        >
          Escrever uma resposta
        </label>
        <textarea
          name="answer"
          rows={4}
          cols={1}
          className="resize-none border border-gray-300 rounded-lg w-full px-2 py-1 text-base focus:border-green-500 focus:ring-1 placeholder:text-sm"
          placeholder="Escreva sua resposta aqui..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></textarea>
        <button
          type="button"
          className={`mt-2 ${
            isSubmitting ? "bg-gray-400" : "bg-green-600"
          } text-white rounded px-4 py-2 hover:${
            isSubmitting ? "bg-gray-400" : "bg-green-700"
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
