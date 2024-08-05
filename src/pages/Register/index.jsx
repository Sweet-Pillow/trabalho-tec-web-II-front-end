import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../../lib/api";

export default function LoginForm() {
	const [errorMessage, setErrorMessage] = useState("");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const { confirmPassword, ...userData } = data;
		try {
			const response = await api.post("/users", userData);

			if (response.status === 201) {
				navigate("/login");
			} else {
				setErrorMessage(response.data.message || "Registration failed");
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				setErrorMessage(error.response.data.message);
			} else {
				setErrorMessage("Error during registration");
			}
		}
	};

	const password = watch("password");

	return (
		<div className="h-screen w-screen flex justify-center items-center bg-gray-100">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 p-8 shadow-xl rounded-xl bg-gray-50 border border-gray-200 w-96"
			>
				<p className="text-3xl font-semibold text-center text-gray-800">Registrar</p>

				{errorMessage && (
					<p className="text-red-500 text-center mb-4">{errorMessage}</p>
				)}

				<div className="flex flex-col">
					<label htmlFor="name" className="text-lg text-gray-700">
						Nome
					</label>
					<input
						{...register("name", { required: "Name is required" })}
						type="text"
						id="name"
						className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-900 placeholder-gray-400"
						placeholder="Enter your name"
					/>
					{errors.name && (
						<span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
					)}
				</div>

				<div className="flex flex-col">
					<label htmlFor="email" className="text-lg text-gray-700">
						Email
					</label>
					<input
						{...register("email", {
							required: "Email is required",
							pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
						})}
						type="email"
						id="email"
						className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-900 placeholder-gray-400"
						placeholder="Enter your email"
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
					)}
				</div>

				<div className="flex flex-col">
					<label htmlFor="password" className="text-lg text-gray-700">
						Senha
					</label>
					<input
						{...register("password", {
							required: "Password is required",
							minLength: { value: 8, message: "Password must be at least 8 characters long" },
						})}
						type="password"
						id="password"
						className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-900 placeholder-gray-400"
						placeholder="Enter your password"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
					)}
				</div>

				<div className="flex flex-col">
					<label htmlFor="confirmPassword" className="text-lg text-gray-700">
						Confirmar Senha
					</label>
					<input
						{...register("confirmPassword", {
							required: "Please confirm your password",
							validate: (value) => value === password || "Passwords do not match",
						})}
						type="password"
						id="confirmPassword"
						className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-300 rounded-md px-3 py-2 mt-1 text-gray-900 placeholder-gray-400"
						placeholder="Confirm your password"
					/>
					{errors.confirmPassword && (
						<span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
					)}
				</div>

				<Link to={"/login"} className="text-sm text-green-600 hover:underline self-end">
					Já possui conta?
				</Link>

				<button
					type="submit"
					className="bg-green-600 text-white rounded-md py-2 mt-4 hover:bg-green-700 transition-colors duration-200"
				>
					Registrar
				</button>
			</form>
		</div>
	);
}
