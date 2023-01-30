import { useState } from "react";

const Login: React.FC = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  return (
    <div>
      <input type="text" />
    </div>
  );
};

export default Login;
