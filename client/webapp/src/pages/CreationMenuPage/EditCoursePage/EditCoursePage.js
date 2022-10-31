import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CommonHeader } from "../../../components/CommonHeader/CommonHeader";
import ApiCourseService from "../../../service/ApiCourseService";

import "./style.css";

export default function EditCoursePage() {
  const [course, setCourse] = useState();

  const navigate = useNavigate();

  const { courseId } = useParams();

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await ApiCourseService.getCourse(courseId);
        setCourse(res);
      } catch (error) {
        setCourse(null);
        console.log(error);
      }
    }

    if (!courseId) {
      return;
    }

    loadCourse();
  }, [courseId]);

  function handleBackClick() {
    navigate("/creation-menu");
  }

  function handleEditClick(moduleId) {
    navigate(`/module/${moduleId}/edit`);
  }

  return (
    <>
      <CommonHeader />
      <div className="edit-course">
        <div className="edit-course__container">
          <button onClick={handleBackClick}>voltar</button>
          {course && (
            <>
              <div className="edit-course__title">
                {course.name}
                <div className="edit-course__badge">
                  <img />
                </div>
              </div>
              <div className="edit-course__description">
                {course.description}
              </div>
              <div className="edit-course__modules">
                <div className="edit-course__modules-title">Módulos</div>
                <div className="edit-course__modules-list">
                  {course.modules.map((module) => {
                    return (
                      <div className="edit-course__module">
                        <div>{module.title}</div>
                        <div>{`${module.experience || 0} xp`}</div>
                        <div>
                          <button onClick={() => handleEditClick(module.id)}>
                            Editar
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
