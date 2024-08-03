import { useRef, useState, useEffect } from "react"
import SelectTag from "../SelectTag/index"

export default function({setTagList}) {
	const [openList, setOpenList] = useState(false)
	const [renderElement, setRenderElement] = useState(true)

	const opcoesSelect = ["CSS", "HTML", "Javascript", "C", "Rust"]
	const listRef = useRef(null);

	const handleList = () => {
		setOpenList(!openList)
	}

	const ElementList = (props) => {
		const handleChange = () => {
			setOpenList(false)
			setTagList(current => [...current, <SelectTag name={props.nameItem}/>])
		}

		return (
			<div
				onClick={handleChange}
				className="w-full hover:bg-slate-300 cursor-pointer pl-2">
				<p>{props.nameItem}</p>
			</div>
		)
	}

	const List = () => {
		useEffect(() => {
			listRef.current.focus()
		}, []);

		return (
			<div
				tabIndex={0}
				ref={listRef}
				onBlur={() => setOpenList(false)}
				className="border-2 border-gray-300 absolute -top-[5.25rem] h-20 w-32 bg-white z-50 rounded-md overflow-y-auto overflow-x-hidden focus:outline-none">
				{opcoesSelect.map((item, index) => (
					<ElementList key={index} nameItem={item} />
				))}
			</div>
		)
	}

	const HandleDelete = () => {
		return (
			<div onClick={() => setRenderElement(false)} className="rounded-full bg-gray-500 p-0.5">
				<svg className="hover:fill-black" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
			</div>
		)
	}

	const Element = () => {
		return (
			<div className="relative h-6 overflow-visible select-none w-20">
				{openList ? <List /> : <></>}
				<div onClick={handleList} className="flex items-center flex-row gap-x-1 rounded-md cursor-pointer min-h-full bg-gray-400 hover:bg-gray-500 pl-2">
				</div>
			</div>
		)
	}

	return (
		<>{renderElement && <Element />}</>
	)
}