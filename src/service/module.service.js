/**
 * Service to deal with modules
 * @typedef {ModuleService} ModuleService
 */
class ModuleService {
  constructor(db) {
    this.db = db;
  }

  async getModules() {
    return this.db.Module.findAll();
  }

  async insertModule(title, content, experience) {
    return this.db.Module.create({
      title,
      content,
      experience,
    });
  }

  async updateModuleContent(id, content) {
    const currentMod = await this.db.Module.findByPk(id);
    if (!currentMod) {
      return null;
    }

    currentMod.content = content;

    await currentMod.save({ fields: ["content"] });

    return currentMod;
  }

  async findModuleById(id) {
    return this.db.Module.findByPk(id);
  }
}

module.exports = ModuleService;
