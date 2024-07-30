import { Link } from "react-router-dom";
import Tag from "../Tag/index";

export default function () {

	const data = {
		idQuestion: 2,
		votes: 10,
		answers: 5,
		title: "Essa é a nova pergunta",
		tags: ["CSS", "Javascript", "HTML5"],
		userName: "Mateus",
		createDate: "29/07/2024"
	}
	return (
		<div className="flex flex-row w-full border-y-2">
			<div className="py-5 text-sm flex flex-col h-full w-2/12 text-nowrap gap-2 text-right">
				<p>{data.votes} Votos</p>
				<p>{data.answers} Respostas</p>
			</div>
			<div className="pl-5 py-4 flex flex-col gap-2 w-2/4">
				<Link to={"/questions/" + data.idQuestion} className="text-lg text-blue-600 hover:text-blue-800">{data.title}</Link>
				<div className="flex justify-between">
					<div className="flex flex-row gap-x-2">
						{data.tags.map((tagName, index) =>
							(<Tag key={index} title={tagName} />)
						)}
					</div>
					<div>
						<p className="text-xs">Criado por: {data.userName} em {data.createDate}</p>
					</div>
				</div>
			</div>
		</div>
	)
}