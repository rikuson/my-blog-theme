import BaseController from './base_controller.js';

class SearchController extends BaseController {
  constructor() {
    super();
  }

  async init() {
    await super.init();
    const res_ids = this.feed.search(this.query.keyword);
    res_ids.map(id => this.show(this.$posts.find(`[data-id="${id}"]`)));
    if (res_ids.length === 0) this.show(this.$message);
  }
}

export default SearchController;
