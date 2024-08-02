import { useRef, useState, useEffect } from "react"

export default function () {
	const [open, setOpen] = useState(false)
	const [itemSelected, setItemSelected] = useState("")

	const opcoesSelect = ["CSS", "HTML", "Javascript", "C", "Rust"]
	const listRef = useRef(null);

	const handleList = () => {
		setOpen(!open)
	}

	const ElementList = (props) => {
		const handleChange = () => {
			setItemSelected(props.itemName)
			setOpen(false)
		}

		return (
			<div
				onClick={handleChange}
				className="w-full hover:bg-slate-300 cursor-pointer pl-2">
				<p>{props.itemName}</p>
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
				onBlur={() => setOpen(false)}
				className="border-2 border-gray-300 absolute -top-[5.25rem] h-20 w-32 bg-white z-50 rounded-md overflow-y-auto overflow-x-hidden focus:outline-none">
				{opcoesSelect.map((item, index) => (
					<ElementList key={index} itemName={item} />
				))}
			</div>
		)
	}

	return (
		<div className={"relative h-6 overflow-visible select-none " + (itemSelected === "" ? "w-20" : "w-fit")}>
			{open ? <List /> : <></>}
			<div onClick={handleList} className="rounded-md cursor-pointer min-h-full bg-gray-400 px-2">
				<p>{itemSelected}</p>
			</div>
		</div>
	)
}