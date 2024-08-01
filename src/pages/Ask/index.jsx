import AddTag from "../../components/AddTag"

export default function () {
	return (
		<div className="w-full flex justify-center items-center flex-col gap-5">
			<div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12">
				<label htmlFor="title" className="text-xl ">Titulo</label>
				<input type="text" name="title" className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1" placeholder="Seja especifico e imagine perguntando isso à outra pessoa." />
			</div>

			<div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12 flex flex-col">
				<label htmlFor="description" className="text-xl ">Descrição</label>
				<textarea name="description" rows={4} cols={1} className="resize-none focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-full placeholder:text-sm placeholder:px-1 py-1"></textarea>
				<AddTag />
			</div>

			<div className="p-10 shadow-2xl rounded border border-gray-300 w-10/12 flex justify-start">
				<button type="button" className='bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700'>Salvar</button>
			</div>
		</div>
	)
}