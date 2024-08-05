import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../lib/api";

export default function CreateQuestion() {
  const opcoesSelect = [
    { label: "CSS", value: "css" },
    { label: "HTML", value: "html" },
    { label: "C", value: "c" },
    { label: "JavaScript", value: "javascript" },
    { label: "Rust", value: "rust" },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    const aux = tags.map((item) => item.value);
    console.log(aux);

    setLoading(true);
    setError(null);
    console.log("Saving question...");

    try {
      const response = await api.post("/questions", {
        title,
        content: description,
        tags: aux,
      });

      const newQuestionId = response.data.id;
      console.log("New Question ID:", newQuestionId);
      navigate(`/question/${newQuestionId}`);
    } catch (err) {
      console.error("Erro ao criar a pergunta:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
    console.log(tags);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-green-700 mb-6">Criar Nova Pergunta</h2>

        <div className="mb-5">
          <label htmlFor="title" className="block text-base font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Seja específico e imagine perguntando isso à outra pessoa."
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Forneça mais detalhes sobre a sua pergunta."
          />
        </div>

        <div className="mb-5">
          <h3 className="text-base font-medium text-gray-700 mb-1">Adicionar Tags</h3>
          <Select
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            options={opcoesSelect}
            onChange={setTags}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-600 text-white py-3 px-5 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
          {error && <p className="text-red-500 text-sm">Erro ao salvar a pergunta.</p>}
        </div>
      </div>
    </div>
  );
}
