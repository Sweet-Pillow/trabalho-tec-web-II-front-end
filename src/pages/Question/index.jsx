import Vote from "../../components/Vote/index"
import Tag from "../../components/Tag/index"
import Answer from "../../components/Answer/index"

export default function () {
	const dataQuestion = {
		question: "Como centralizar uma div?",
		description: "Estou com muita dificuldade em centralizar uma div, usando apenas css puro",
		createData: "30/07/2024",
		votes: 3,
		userName: "JJ",
		tags: ["CSS", "HTML"]
	}

	const dataAnswer = [
		{
			userName: "Yuri",
			createData: "01/08/2024",
			answer: "Usa flex box",
			votes: 10
		},
		{
			userName: "Mouse",
			createData: "02/08/2024",
			answer: "Usa flex box",
			votes: 20
		}
	]

	return (
		<div className='w-full px-10 flex flex-col'>

			{/* Inicio seção da pergunta */}
			<div className='py-9 flex flex-col justify-start gap-2 border-b border-gray-300'>

				<h1 className='text-[2rem]'>{dataQuestion.question}</h1>

				<div className="flex flex-row gap-5">
					<div className="flex flex-row text-xs">
						<p className="text-gray-700">Perguntado por:&nbsp;</p>
						<p>{dataQuestion.userName}</p>
					</div>
					<div className="flex flex-row text-xs">
						<p className="text-gray-700">Criada em:&nbsp;</p>
						<p>{dataQuestion.createData}</p>
					</div>

				</div>
			</div>

			<div className="flex flex-row py-4">
				<Vote votes={dataQuestion.votes} />

				<div className="px-10 flex flex-col gap-y-6">
					<p className="text-lg">{dataQuestion.description}</p>
					<div className="flex flex-row gap-x-2">
						{dataQuestion.tags.map((tagName, index) => (
							<Tag key={index} title={tagName} />
						))}
					</div>
				</div>
			</div>

			{/* Fim seção da pergunta */}

			<div className="flex flex-row mt-6 mb-3 text-[1.3rem]">
				<p>{dataAnswer.length}&nbsp;</p>
				<p> Resposta(s)</p>
			</div>

			{/* Inicio sessão de visualizar comentarios */}

			{dataAnswer.map((content, index) => 
				(
					<Answer key={index} votes={content.votes} userName={content.userName} createData={content.createData} answer={content.answer}/>
				))
			}

			{/* Fim sessão de visualizar comentarios */}

			{/* Inicio sessão de postar comentarios */}

			<div className="flex flex-col gap-1 border-t border-gray-300 mb-4 mt-8">
				<label htmlFor="answer" className="text-[1.3rem] py-4">Escrever uma resposta</label>
				<textarea name="answer" rows={4} cols={1} className="resize-none focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1"></textarea>
				<button type="button" className='mt-2 bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700'>Responder</button>
			</div>

			{/* Fim sessão de postar comentarios */}
			
		</div>
	)
}