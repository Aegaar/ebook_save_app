import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const submitHandler = async (event) => {
    event.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Logowanie</h3>
      <label>Email</label>
      <input
        type="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
      ></input>
      <label>Hasło</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      ></input>
      <button type="submit" disabled={isLoading}>
        Zaloguj się
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
