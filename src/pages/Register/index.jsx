import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(""); // State to hold server error message
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 201) {
        // Registration successful
        navigate("/login");
      } else {
        // Handle server errors
        setServerError(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setServerError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-8 bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md"
      >
        <p className="text-3xl font-semibold text-green-700 mb-4">Registrar</p>

        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}

        <label htmlFor="name" className="text-base font-medium text-gray-700">
          Nome
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          name="name"
          className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border border-gray-300 rounded-lg placeholder:text-sm py-2 px-3 mb-1"
          placeholder="Enter your name"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        <label htmlFor="email" className="text-base font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          name="email"
          className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border border-gray-300 rounded-lg placeholder:text-sm py-2 px-3 mb-1"
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <label
          htmlFor="password"
          className="text-base font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          name="password"
          className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border border-gray-300 rounded-lg placeholder:text-sm py-2 px-3 mb-1"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-base font-medium text-gray-700"
        >
          Confirmar Senha
        </label>
        <input
          {...register("confirmPassword", {
            required: "Confirm your password",
          })}
          type="password"
          name="confirmPassword"
          className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border border-gray-300 rounded-lg placeholder:text-sm py-2 px-3 mb-1"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}

        <Link
          to={"/login"}
          className="text-sm text-green-600 hover:underline self-end mb-4"
        >
          Já possui conta?
        </Link>

        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
