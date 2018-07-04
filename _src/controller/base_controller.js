import $ from 'jquery';
import 'bootstrap';
import '~/style.css'
import SearchBox from '~/model/search_box.js';
import Feed from '~/model/feed.js';
import AutoComplete from '~/model/auto_complete.js';

class BaseController {
  constructor() {
    this.$posts = $('#posts');
    this.$message = $('#search_message');
    this.$search_box = new SearchBox('#search_box');
    this.query = this.getQuery();
  }

  async init() {
    // open external link as new tab
    $('a[href^="http"]').attr('target', '_blank');

    const xml = await $.ajax({ url: '/feed.xml', dataType: 'xml' });
    this.feed = new Feed(xml);
    this.$search_box.val(this.query.keyword);

    const $auto_complete = new AutoComplete(this.feed, '#auto_complete');
    // search event
    this.$search_box.on('ready', () => {
      if (this.$search_box.val()) {
        $auto_complete.suggest(this.$search_box.val());
      } else {
        $auto_complete.hide();
      }
    });
    this.$search_box.on('blur', () => $auto_complete.stop().hide());
  }

  getQuery() {
    const query = { keyword: '' };
    const param_str = location.search.slice(1);
    param_str.split('&').map(str => {
      const tmp = str.split('=');
      query[tmp[0]] = tmp[1];
    });
    return query;
  }

  show($elm) {
    $elm.removeClass('d-none');
  }
}

export default BaseController;
