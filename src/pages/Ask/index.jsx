import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate para redirecionamento
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
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-8/12 lg:w-6/12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Nova Pergunta</h2>
                
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Seja específico e imagine perguntando isso à outra pessoa."
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                        Descrição
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Forneça mais detalhes sobre a sua pergunta."
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Adicionar Tags</h3>
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
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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