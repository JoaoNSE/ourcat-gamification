import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiWrapperService from "../../service/ApiWrapperService";
import "./style.css";

export function HomePage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getModulesAndUser();

    async function getModulesAndUser() {
      try {
        const user = await ApiWrapperService.getMe();
        setUser(user);
      } catch (err) {}

      setModules(await ApiWrapperService.getAllModules());
    }
  }, []);

  return (
    <>
      <CommonHeader />
      <div className="home-page-container">
        <div>Módulos Disponíveis (depois serão cursos)</div>
        {modules &&
          modules.map((module) => {
            return (
              <div key={module.id}>
                <span>
                  {module.title} -{" "}
                  <button onClick={() => navigate(`/module/${module.id}`)}>
                    Ler
                  </button>
                  {user?.role == "CREATOR" && (
                    <button
                      onClick={() => navigate(`/module/${module.id}/edit`)}
                    >
                      Editar
                    </button>
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
}
