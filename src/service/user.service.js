/**
 * Service to deal with Users
 * @typedef {UserService} UserService
 */
class UserService {
  constructor(db) {
    this.db = db;
  }

  async getUsers() {
    return this.db.User.findAll();
  }

  async findUserByEmailAndPassword(email, password) {
    return this.db.User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async findUserById(id) {
    return this.db.User.findByPk(id);
  }

  async findUserCourses(userId) {
    let courses = await this.db.Course.findAll({
      where: {
        "$userCourseModules.userId$": userId,
      },
      include: [{ model: this.db.UserCourseModules }],
    });

    courses = await Promise.all(
      courses.map(async (course) => {
        let nCourse = course.dataValues;
        const modules = await course.getModules();
        nCourse.modules = nCourse.UserCourseModules.map((module) => {
          const compMod = modules.find((m) => m.id === module.moduleId);

          return {
            id: compMod.id,
            title: compMod.title,
            experience: compMod.experience,
            completed: module.completed ? true : false,
            earnedXp: module.earnedXp,
          };
        });

        delete nCourse.UserCourseModules;
        return nCourse;
      })
    );

    return courses;
  }
}

module.exports = UserService;
