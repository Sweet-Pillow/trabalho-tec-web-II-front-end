import QuestionView from '../../components/QuestionView/index'
import { useNavigate } from "react-router-dom";

export default function() {
	let navigate = useNavigate();

	return(
		<div className='w-full'>
			<div className='py-9 pl-10 flex flex-row items-center'>
				<h1 className='text-[2rem]'>Questões</h1>
				<button type="button" onClick={() => navigate("/ask")} className='bg-blue-600 text-white rounded px-2 py-2 ml-96 h-fit hover:bg-blue-700'>Perguntar</button>
			</div>
			<QuestionView />
		</div>
	)
}