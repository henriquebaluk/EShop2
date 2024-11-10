import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRegister.css";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [states, setStates] = useState([]); 
  const [selectedState, setSelectedState] = useState(""); 
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (isRegister) {
      const fetchStates = async () => {
        try {
          const response = await axios.get("https://brasilapi.com.br/api/ibge/uf/v1");
          setStates(response.data);
        } catch (error) {
          console.error("Erro ao buscar os estados:", error);
        }
      };
      fetchStates();
    }
  }, [isRegister]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cadastro realizado com sucesso! Redirecionando para o login.");
        setIsRegister(false);
        navigate("/login"); 
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado com sucesso!");
        navigate("/"); 
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Cadastro" : "Login"}</h2>
      <form onSubmit={handleAuth} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegister && (
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
          >
            <option value="">Selecione o Estado</option>
            {states.map((state) => (
              <option key={state.sigla} value={state.sigla}>
                {state.nome}
              </option>
            ))}
          </select>
        )}
        <button type="submit">{isRegister ? "Cadastrar" : "Entrar"}</button>
        <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"}
        </p>
      </form>
    </div>
  );
};

export default LoginRegister;
