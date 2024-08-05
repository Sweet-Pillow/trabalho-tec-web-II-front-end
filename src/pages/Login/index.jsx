import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import api from "../../lib/api";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/users/sign-in", data);
      if (response.status === 200) {
        const { token, refreshToken } = response.data;
        Cookies.set("token", token, { expires: 1 / 24 }); // 1 hour = 1/24 of a day
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
        navigate("/");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 p-8 bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-md"
      >
        <p className="text-3xl font-semibold text-green-700 mb-4">Log In</p>

        <label htmlFor="email" className="text-base font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
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
          {...register("password", { required: "Password is required" })}
          type="password"
          name="password"
          className="focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 border border-gray-300 rounded-lg placeholder:text-sm py-2 px-3 mb-1"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <Link
          to={"/register"}
          className="text-sm text-green-600 hover:underline self-end mb-4"
        >
          Não possui conta?
        </Link>

        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
