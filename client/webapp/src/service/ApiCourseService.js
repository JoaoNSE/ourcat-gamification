import ApiWrapperService from "./ApiWrapperService";

async function getAllCourses() {
  return (await ApiWrapperService.api.get("/courses")).data;
}

async function getCourse(courseId) {
  return (await ApiWrapperService.api.get(`/courses/${courseId}`)).data;
}

async function getCourseModules(courseId) {
  return (await ApiWrapperService.api.get(`/courses/${courseId}/modules`)).data;
}

async function getModuleById(moduleId) {
  return (await ApiWrapperService.api.get(`/modules/${moduleId}`)).data;
}

async function updateModuleById(moduleId, module) {
  return (await ApiWrapperService.api.put(`/modules/${moduleId}`, module)).data;
}

const ApiCourseService = {
  getAllCourses,
  getCourse,
  getCourseModules,
  getModuleById,
  updateModuleById,
};

export default ApiCourseService;
