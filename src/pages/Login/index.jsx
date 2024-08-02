import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import api from "../../lib/api";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/users/sign-in", data);

      if (response.status === 200) {
        const { token, refreshToken } = response.data;
        Cookies.set("token", token, { expires: 1 / 24 }); // 1 hour = 1/24 of a day
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-10 shadow-2xl rounded border border-gray-300 w-fit"
      >
        <label htmlFor="email" className="text-xl">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          type="email"
          name="email"
          className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-2/4 placeholder:text-sm placeholder:px-1 py-1"
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-xl">
          Senha
        </label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          name="password"
          className="focus:border-blue-800 focus:outline-none focus:ring-1 border border-gray-400 rounded-lg w-2/4 placeholder:text-sm placeholder:px-1 py-1"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-2 py-2 w-fit h-fit hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
