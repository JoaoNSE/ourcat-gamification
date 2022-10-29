import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiWrapperService from "../../service/ApiWrapperService";
import "./style.css";

export function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);
    try {
      const user = await ApiWrapperService.login(email, password);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        setError("Usuário ou senha incorretos");
      } else {
        setError("Erro ao fazer login: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CommonHeader />
      <div className="login-page">
        <div className="login-page__panel">
          <div className="login-page__panel-title">Entrar</div>
          {!loading && (
            <>
              {error && <div className="login-page__panel-error">{error}</div>}
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              <button onClick={handleSubmit}>Enviar</button>
            </>
          )}
          {loading && <div>Enviando...</div>}
        </div>
      </div>
    </>
  );
}
