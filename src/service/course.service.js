/**
 * Service to deal with modules
 * @typedef {CourseService} CourseService
 */
class CourseService {
  constructor(db) {
    this.db = db;
  }

  async insertCourse(badgeImageRef, name, description) {
    return this.db.Course.create({
      badgeImageRef,
      name,
      description,
    });
  }

  async findAllCourses() {
    return this.db.Course.findAll();
  }

  async findCourseById(id, embedModules = false) {
    let course = await this.db.Course.findOne({
      where: {
        id,
      },
      include: embedModules ? this.db.Module : [],
    });

    if (!course) return null;

    course = course.dataValues;

    course.modules =
      course?.Modules?.map((module) => {
        const val = module.dataValues;
        delete val.CourseId;
        return val;
      }) || [];

    delete course.Modules;
    return course;
  }

  async findCourseByIdWithUserProgress(courseId, userId, embedModules = false) {
    const course = await this.db.Course.findOne({
      where: {
        id: courseId,
      },
      include: this.db.Module,
    });

    if (!course) return null;

    let progress = await course.getUserCourseModules({ where: { userId } });

    let values = course.dataValues;
    values.userProgress = progress.map((p) => p.dataValues);

    delete Object.assign(values, { modules: values.Modules }).Modules;

    return values;
  }

  async findCourseProgress(courseId, userId) {
    const progress = await this.db.UserCourseModules.findAll({
      where: {
        courseId,
        userId,
      },
    });

    return progress.map((p) => p.dataValues);
  }

  async updateCourseById(id, badgeImageRef, name, description) {
    const currentCourse = await this.db.Course.findByPk(id);
    if (!currentCourse) {
      return null;
    }

    currentCourse.badgeImageRef = badgeImageRef || currentCourse.badgeImageRef;
    currentCourse.name = name || currentCourse.name;
    currentCourse.description = description || currentCourse.description;

    await currentCourse.save();
    return currentCourse;
  }

  async findCourseModules(courseId) {
    return this.db.Module.findAll({
      where: {
        courseId,
      },
    });
  }

  async insertModule(courseId, title, content, experience) {
    return this.db.Module.create({
      courseId,
      title,
      content,
      experience,
    });
  }

  async updateModuleById(id, content, title, experience, courseId) {
    const currentMod = await this.db.Module.findByPk(id);
    if (!currentMod) {
      return null;
    }

    currentMod.content = content || currentMod.content;
    currentMod.title = title || currentMod.title;
    currentMod.experience = experience || currentMod.experience;
    currentMod.courseId = courseId || currentMod.courseId;

    await currentMod.save();
    return currentMod;
  }

  async findModuleById(id) {
    return this.db.Module.findByPk(id);
  }
}

module.exports = CourseService;
