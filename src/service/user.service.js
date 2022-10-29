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

  // async insertModule(title, content, experience) {
  //   return this.db.Module.create({
  //     title,
  //     content,
  //     experience,
  //   });
  // }

  // async updateModuleContent(id, content) {
  //   const currentMod = await this.db.Module.findByPk(id);
  //   if (!currentMod) {
  //     return null;
  //   }

  //   currentMod.content = content;

  //   await currentMod.save({ fields: ["content"] });

  //   return currentMod;
  // }

  // async findModuleById(id) {
  //   return this.db.Module.findByPk(id);
  // }
}

module.exports = UserService;
