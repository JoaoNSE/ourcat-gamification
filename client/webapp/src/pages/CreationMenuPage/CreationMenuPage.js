import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonHeader } from "../../components/CommonHeader/CommonHeader";
import ApiCourseService from "../../service/ApiCourseService";
import ApiWrapperService from "../../service/ApiWrapperService";
import "./style.css";

export function CreationMenuPage() {
  const [user, setUser] = useState();
  const [courses, setCourses] = useState();

  const navigate = useNavigate();

  function verifyUser(newUser) {
    setUser(newUser);
    if (!newUser || newUser.role !== "CREATOR") {
      navigate("/");
    }
  }

  function handleEditClick(courseId) {
    navigate(`/creation-menu/course/${courseId}`);
  }

  useEffect(() => {
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

      verifyUser(us);
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await ApiCourseService.getAllCourses();
        setCourses(response.courses);
      } catch (error) {
        console.log(error);
      }
    }

    loadCourses();
  }, [user]);

  return (
    <>
      <CommonHeader />
      <div className="creation-menu">
        {courses &&
          courses.map((course) => {
            return (
              <div className="creation-menu__course-card" key={course.id}>
                <div>{course.name}</div>
                <p>{course.description}</p>
                <button onClick={() => handleEditClick(course.id)}>
                  Editar
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
