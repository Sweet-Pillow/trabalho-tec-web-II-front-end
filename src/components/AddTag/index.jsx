import { useState } from "react"
import CreateTag from "../CreateTag"

export default function () {

	const [tagList, setTagList] = useState([])

	return (
		<div className="my-5">
			<div><h1>Adicionar Tags</h1></div>
			<div className="border border-gray-400 p-2 rounded-lg flex flex-row flex-wrap gap-1">
				{tagList?.map((_item, index) => {
					return (<div key={index}>{_item}</div>)
				})}
				<CreateTag setTagList={setTagList} />
			</div>
		</div>
	)
}