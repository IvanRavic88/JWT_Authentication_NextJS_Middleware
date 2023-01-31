import { ChangeEvent, useState } from "react";
import { api } from "../utils/api";

const Login: React.FC = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: login } = api.auth.login.useMutation();

  return (
    <div className="m-auto flex h-[100vh] items-center justify-center">
      <input
        className="mr-2 border border-zinc-900 p-1"
        placeholder="email"
        type="text"
        value={input.email}
        onChange={handleChange}
      />
      <input
        className="mr-2 border border-zinc-900 p-1"
        placeholder="password"
        type="text"
        value={input.password}
        onChange={handleChange}
      />
      <button onClick={() => login(input)} type="button">
        Sign in
      </button>
    </div>
  );
};

export default Login;
