import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleViewer from "../../components/ArticleViewer/ArticleViewer";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiCourseService from "../../service/ApiCourseService";

import "./style.css";

export default function ReadModulePage() {
  const [module, setModule] = useState();
  const [course, setCourse] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getModule() {
      const module = await ApiCourseService.getModuleById(id);
      setModule(module);

      const course = await ApiCourseService.getCourse(module.courseId);
      setCourse(course);
    }

    getModule();
  }, [id]);

  return (
    <>
      <CommonHeader />
      <div className="read-module-pag__container read-module-page__course-panel">
        {!course ? (
          "Loading..."
        ) : (
          <>
            <div>
              <Link to={`/course/${course.id}`}>{course.name}</Link>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>

            <div>{module.title}</div>
          </>
        )}
      </div>
      {!module && <p>Loading...</p>}
      {module && (
        <div className="read-module-pag__container">
          <div className="read-module-page__content">
            <ArticleViewer content={module.content} />
          </div>
          <button>Completar</button>
        </div>
      )}
    </>
  );
}
