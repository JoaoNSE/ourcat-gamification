import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiWrapperService from "../../service/ApiWrapperService";
import "./style.css";

export function HomePage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModules();

    async function getModules() {
      console.log("getds");
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
                </span>
              </div>
            );
          })}
      </div>
    </>
  );
}
