import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiCourseService from "../../service/ApiCourseService";
import ApiWrapperService from "../../service/ApiWrapperService";
import "./style.css";

export function HomePage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getCoursesAndUser();

    async function getCoursesAndUser() {
      try {
        const user = await ApiWrapperService.getMe();
        setUser(user);
      } catch (err) {}

      setCourses((await ApiCourseService.getAllCourses()).courses);
    }
  }, []);

  return (
    <>
      <CommonHeader />
      <div className="home-page">
        <div className="home-page-container">
          <div>Módulos Disponíveis (depois serão cursos)</div>
          {courses &&
            courses.map((course) => {
              return (
                <div key={course.id} className="course-card-mini">
                  <div className="course-card-mini__badge">
                    <img src={course.badgeImageRef} alt="insígnia" />
                  </div>
                  <div className="course-card-mini__details">
                    <div
                      className="course-card-mini__details-title"
                      onClick={() => navigate(`course/${course.id}`)}
                    >
                      {course.name}
                    </div>
                    <div className="course-card-mini__details-description">
                      {course.description}
                    </div>
                    <div className="course-card-mini__details-estimate">
                      ~10 minutos
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
