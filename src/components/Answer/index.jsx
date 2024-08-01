import Vote from '../Vote/index'

export default function(props) {
	return(
		<div className="flex flex-row border-t border-gray-300 py-4 mb-4">
				<Vote votes={props.votes} />

				<div className="px-10 flex flex-col gap-y-6">

					<div className="flex flex-row gap-5">
						<div className="flex flex-row text-xs">
							<p className="text-gray-700">Respondida por:&nbsp;</p>
							<p>{props.userName}</p>
						</div>
						<div className="flex flex-row text-xs">
							<p className="text-gray-700">Criada em:&nbsp;</p>
							<p>{props.createData}</p>
						</div>
					</div>

					<p className="text-lg">{props.answer}</p>
				</div>

			</div>
	)
}