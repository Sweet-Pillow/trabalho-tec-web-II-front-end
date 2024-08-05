import QuestionView from '../../components/QuestionView/index';
import { useNavigate } from "react-router-dom";

export default function() {
  let navigate = useNavigate();

  return (
    <div className='w-full px-8 py-6 bg-gray-50 min-h-screen'>
      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Questões</h1>
        <button 
          type="button" 
          onClick={() => navigate("/ask")} 
          className='bg-teal-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition duration-300 ease-in-out'
        >
          Perguntar
        </button>
      </div>
      <div className='bg-white shadow rounded-lg p-6'>
        <QuestionView />
      </div>
    </div>
  );
}
