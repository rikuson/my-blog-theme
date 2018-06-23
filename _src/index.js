import $ from 'jquery';
import 'bootstrap';
import Liquid from 'liquidjs';
import SearchBox from './search_box.js';
import Feed from './feed.js';
import post_template from '~/_includes/post.html';

$(async function() {
  // open external link as new tab
  $('a[href^="http"]').attr('target', '_blank');

  const liquid = new Liquid();
  const post_view = liquid.parse(post_template);
  const $search_box = new SearchBox($('#search_box'));
  const feed = new Feed('feed.xml');

  // search event
  $search_box.on('free', renderPosts.bind(this));

  async function renderPosts() {
    let posts_html = '';
    let posts = feed.search($search_box.val());
    for (var i in posts) {
      let post = posts[i];
      posts_html += await liquid.render(post_view, { post });
    }
    $('#posts').html(posts_html);
  }
});
