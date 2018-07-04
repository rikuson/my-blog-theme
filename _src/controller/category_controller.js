import BaseController from './base_controller.js';

class CategoryController extends BaseController {
  constructor() {
    super();
    this.show(this.$posts.find('[data-id]'));
  }
}

export default CategoryController;
