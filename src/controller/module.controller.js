class ModuleController {
  /**
   * @param {import('../service/module.service').ModuleService} moduleService
   */
  constructor(moduleService) {
    /**
     * @type {import('../service/module.service').ModuleService}
     */
    this.moduleService = moduleService;
  }

  async getModules(req, res, next) {
    try {
      res.json(await this.moduleService.getModules());
    } catch (error) {
      next(error);
    }
  }

  async createModule(req, res, next) {
    try {
      const module = await this.moduleService.insertModule(
        req.body.title,
        req.body.content,
        10
      );
      res.json(module);
    } catch (error) {
      next(error);
    }
  }

  async getModuleById(req, res, next) {
    try {
      const module = await this.moduleService.findModuleById(req.params.id);
      res.json(module);
    } catch (error) {
      next(error);
    }
  }

  async updateModuleById(req, res, next) {
    try {
      console.log("ipd");
      const id = req.params.id;
      const module = await this.moduleService.updateModuleContent(
        id,
        req.body.content
      );
      res.status(202).json(module);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ModuleController;
