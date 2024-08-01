import { useState } from "react"

export default function (props) {

	const [votes, setVotes] = useState(props.votes)
	
	return (
		<div className="flex flex-col items-center">
			<button onClick={() => setVotes(votes + 1)} className="border rounded-full border-gray-400 hover:bg-orange-100"><svg className="fill-black" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="m280-400 200-201 200 201H280Z" /></svg></button>
			<p className="text-2xl py-2 font-semibold">{votes}</p>
			<button onClick={() => setVotes(votes - 1)} className="border rounded-full border-gray-400 hover:bg-orange-100"><svg className="fill-black" xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M480-360 280-559h400L480-360Z"/></svg></button>
		</div>
	)
}