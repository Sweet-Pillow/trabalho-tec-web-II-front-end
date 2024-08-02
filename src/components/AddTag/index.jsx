import { useState } from "react"
import SelectTag from "../SelectTag"

export default function() {

	return(
		<div className="my-5">
			<div><h1>Adicionar Tags</h1></div>
			<div className="border border-gray-400 p-2 rounded-lg">
				<SelectTag />
			</div>
		</div>
	)
}