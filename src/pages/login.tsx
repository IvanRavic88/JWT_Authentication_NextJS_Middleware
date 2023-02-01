import type { ChangeEvent } from "react";
import { api } from "../utils/api";
import { useState } from "react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const { mutate: login, isError } = api.auth.login.useMutation({
    onSuccess: async () => {
      await router.push("/dashboard");
    },
  });
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto flex h-[100vh] max-w-sm flex-col justify-center p-6 text-center font-sans ">
      {isError && (
        <p className="mb-2 text-sm text-red-500">Invalid login data</p>
      )}
      <input
        name="email"
        className="mb-6 w-full rounded border border-gray-400 p-2 shadow-lg"
        placeholder="email"
        type="text"
        value={input.email}
        onChange={handleChange}
      />
      <input
        name="password"
        className="mb-6 w-full rounded border border-gray-400 p-2 shadow-lg"
        placeholder="password"
        type="text"
        value={input.password}
        onChange={handleChange}
      />
      <button
        className="w-full rounded bg-rose-500 p-2 font-bold text-white shadow-lg hover:bg-rose-600"
        onClick={() => login(input)}
        type="button"
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
