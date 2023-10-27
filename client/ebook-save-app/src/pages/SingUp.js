import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const submitHandler = async (event) => {
    event.preventDefault();

    await signup(email, password);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Zarejestruj się</h3>
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
        Utwórz konto
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default SingUp;
