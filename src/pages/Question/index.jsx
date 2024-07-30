import Vote from "../../components/Vote/index"
import Tag from "../../components/Tag/index"

export default function () {
	const data = {
		question: "Como centralizar uma div?",
		description: "Estou com muita dificuldade em centralizar uma div, usando apenas css puro",
		createData: "30/07/2024",
		votes: 3,
		tags: ["CSS", "HTML"]
	}

	return (
		<div className='w-full px-10'>

			{/* Inicio seção da perguntaa */}
			<div className='py-9 flex flex-col justify-start gap-2 border-b border-gray-300'>

				<h1 className='text-[2rem]'>{data.question}</h1>

				<div className="flex flex-row gap-5">
					<div className="flex flex-row text-xs">
						<p className="text-gray-700">Criada em:&nbsp;</p>
						<p>{data.createData}</p>
					</div>
					<div className="flex flex-row text-xs">
						<p className="text-gray-700">Votos:&nbsp;</p>
						<p>{data.votes}</p>
					</div>
				</div>
			</div>

			<div className="flex flex-row py-4">
				<Vote votes={data.votes} />

				<div className="px-10 flex flex-col gap-y-6">
					<p className="text-lg">{data.description}</p>
					<div className="flex flex-row gap-x-2">
						{data.tags.map((tagName, index) => (
							<Tag key={index} title={tagName} />
						))}
					</div>
				</div>
			</div>

			{/* Fim seção da pergunta */}

			
		</div>
	)
}