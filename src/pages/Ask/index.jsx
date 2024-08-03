import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate para redirecionamento
import AddTag from "../../components/AddTag";
import api from "../../lib/api";

export default function CreateQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Cria uma instância de useNavigate

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    console.log("Saving question...");

    try {
      const response = await api.post("/questions", {
        title,
        content: description,
        tags
      });

      const newQuestionId = response.data.id;
      console.log("New Question ID:", newQuestionId);
      navigate(`/question/${newQuestionId}`); // Correção aqui
    } catch (err) {
      console.error("Erro ao criar a pergunta:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-5">
      <div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12">
        <label htmlFor="title" className="text-xl">Título</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1"
          placeholder="Seja específico e imagine perguntando isso à outra pessoa."
        />
      </div>

      <div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12 flex flex-col">
        <label htmlFor="description" className="text-xl">Descrição</label>
        <textarea
          name="description"
          rows={4}
          cols={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1"
        />
        <AddTag tags={tags} setTags={setTags} />
      </div>

      <div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12 flex justify-start">
        <button
          type="button"
          onClick={handleSave}
          className='bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700'
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
        {error && <p className="text-red-500">Erro ao salvar a pergunta.</p>}
      </div>
    </div>
  );
}
