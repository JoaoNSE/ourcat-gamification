import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import "./style.css";
import ModuleItem from "./components/ModuleItem/ModuleItem";
import { useEffect, useState } from "react";
import ApiCourseService from "../../service/ApiCourseService";
import { useNavigate, useParams } from "react-router-dom";
import ApiWrapperService from "../../service/ApiWrapperService";

export default function CoursePage() {
  const [user, setUser] = useState();
  const [course, setCourse] = useState();
  const [progressStarted, setProgressStarted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentModuleIdx, setCurrentModuleIdx] = useState(-1);

  function getStartResumeButtonLabel() {
    if (!progressStarted) {
      return "Começar curso";
    }

    return "Continuar curso";
  }

  function startOrResumeCourse() {
    if (progressStarted) {
      navigate(`/module/${course.userProgress[currentModuleIdx].moduleId}`);
    }

    //TODO: Implementar
    console.log("Começar curso");
  }

  function getModuleStatus(module) {
    let idx = course.userProgress?.findIndex(
      (mod) => mod.moduleId == module.id
    );
    let moduleProgress = idx > -1 && course.userProgress[idx];

    if (moduleProgress?.completed) {
      return "done";
    }

    if (idx > -1 && idx === currentModuleIdx) {
      return "doing";
    }

    return "locked";
  }

  useEffect(() => {
    async function fetchCourse() {
      const course = await ApiCourseService.getCourse(id);

      course.experience = course.modules.reduce(
        (acc, module) => acc + module.experience,
        0
      );

      let modulesQtd = course.modules.length;
      let completedModules =
        course.userProgress?.filter((mod) => mod.completed).length || 0;

      course.progressPercentage = Math.round(
        (completedModules / modulesQtd) * 100
      );

      const started = course.userProgress?.length > 0;
      setProgressStarted(started);

      if (started) {
        //TODO: Mudar a lógica do próximo disponível para usar a sequência de módulos ao invés do índice
        for (let i = 0; i < course.userProgress.length; i++) {
          if (!course.userProgress[i].completed) {
            setCurrentModuleIdx(i);
            break;
          }
        }
      }

      setCourse(course);
    }

    async function loadUser() {
      let us;
      try {
        us = await ApiWrapperService.getMe();
        setUser(us);
      } catch (error) {
        us = null;
        setUser(us);

        if (error.response.status !== 401) {
          throw error;
        }
      }
    }

    loadUser();
    fetchCourse();
  }, [id]);

  return (
    <>
      <CommonHeader />
      <div className="course-page">
        <div className="course-page__container">
          {!course && <Spinner animation="border" variant="primary" />}
          {course && (
            <>
              <div className="course-page__header">
                <div className="course-page__header-badge">
                  <img src={course.badgeImageRef} alt="insígnia"></img>
                </div>
                <div className="course-page__header-info">
                  <div className="course-page__header-info-name">
                    {course.name}
                  </div>
                  <div className="course-page__header-info-details">
                    <div>~ 10 minutos</div>
                    <div className="course-page__header-info-details--separator">
                      |
                    </div>
                    <Badge pill bg="primary">
                      {`+${course.experience} XP`}
                    </Badge>
                  </div>
                  <div className="course-page__header-info-description">
                    {course.description}
                  </div>
                  <div className="course-page__header-info-progress">
                    <ProgressBar
                      animated
                      now={course.progressPercentage}
                      label={`${course.progressPercentage}%`}
                    />
                  </div>
                  {!user && (
                    <Alert variant="info">
                      <p>Faça login para começar esse curso.</p>
                      <p>Ou cadastre-se, é gratuito 😊</p>
                    </Alert>
                  )}
                  <div
                    className={`course-page__header-button${
                      !user ? " course-page__header-button--disabled" : ""
                    }`}
                    onClick={() => startOrResumeCourse()}
                  >
                    {getStartResumeButtonLabel()}
                  </div>
                </div>
              </div>
              <div className="course-page__modules">
                <h4>Módulos</h4>

                <div>
                  {course.modules.map((module) => (
                    <ModuleItem
                      status={getModuleStatus(module)}
                      module={module}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
