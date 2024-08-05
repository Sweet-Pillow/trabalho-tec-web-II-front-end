import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		try {
			const response = await api.post("/users", data);

			if (response.status === 201) {
				navigate("/login");
			} else {
				console.error("Register failed:", response.statusText);
			}
		} catch (error) {
			console.error("Error during register:", error);
		}
	};

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 p-10 shadow-2xl rounded border border-gray-300 w-fit"
			>
				<p className="text-3xl">Registrar</p>

				<label htmlFor="name" className="text-lg">
					Nome
				</label>
				<input
					{...register("name", { required: "Name is required" })}
					type="name"
					name="name"
					className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg placeholder:text-sm placeholder:px-1 py-1"
					placeholder="Enter your name"
				/>
				{errors.name && (
					<span className="text-red-500">{errors.name.message}</span>
				)}

				<label htmlFor="email" className="text-lg">
					Email
				</label>
				<input
					{...register("email", {
						required: "Email is required",
						pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
					})}
					type="email"
					name="email"
					className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg placeholder:text-sm placeholder:px-1 py-1"
					placeholder="Enter your email"
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}

				<label htmlFor="password" className="text-lg">
					Senha
				</label>
				<input
					{...register("password", { required: "Password is required" })}
					type="password"
					name="password"
					className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg placeholder:text-sm placeholder:px-1 py-1"
					placeholder="Enter your password"
				/>
				{errors.password && (
					<span className="text-red-500">{errors.password.message}</span>
				)}

				<Link to={"/login"} className="text-sm hover:underline underline-offset-2 w-fit">Já possui conta?</Link>

				<button
					type="submit"
					className="bg-blue-600 text-white rounded-lg px-2 py-2 w-full h-fit hover:bg-blue-700"
				>
					Registrar
				</button>
			</form>
		</div>
	);
}
