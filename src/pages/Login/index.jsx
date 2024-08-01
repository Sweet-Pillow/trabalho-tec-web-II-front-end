import { useForm } from "react-hook-form"
import api from "../../lib/api"

export default function () {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		console.log(data)
		const response = await api.post("/users/sign-in", data)

		if(response.status){
			
		}
	}

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-10 shadow-2xl rounded border border-gray-300 w-fit">
				<label htmlFor="email" className="text-xl ">Email</label>
				<input {...register("email")} type="email" name="email" className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-2/4 placeholder:text-sm placeholder:px-1 py-1" placeholder="Seja especifico e imagine perguntando isso à outra pessoa." />
				<label htmlFor="password" className="text-xl ">Senha</label>
				<input {...register("password")} type="text" name="password" className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-2/4 placeholder:text-sm placeholder:px-1 py-1" placeholder="Seja especifico e imagine perguntando isso à outra pessoa." />
				<button type="submit" className='bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700'>Login</button>
			</form>
		</div>

	)
} 