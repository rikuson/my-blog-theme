import $ from 'jquery';
import 'bootstrap';
import SearchBox from './search_box.js';
import Feed from './feed.js';

$(async function() {
  // open external link as new tab
  $('a[href^="http"]').attr('target', '_blank');

  const $search_box = new SearchBox($('#search_box'));
  const feed = new Feed('feed.xml');
  const $posts = $('#posts');
  const post_ids = $.makeArray($posts.children().map(function() {
    return $(this).data('id');
  }));
  const $message = $('#search_message');

  // search event
  $search_box.on('free', renderPosts);

  function renderPosts() {
    const res_ids = feed.search($search_box.val());
    const res_exists = res_ids.length === 0;
    display($message, res_exists);
    post_ids.forEach(post_id => {
      const $post = $posts.find(`[data-id="${post_id}"]`);
      const res_includes_post = res_ids.includes(post_id);
      display($post, res_includes_post);
    });
  }

  function display($elm, condition) {
    if (condition) {
      $elm.removeClass('d-none');
    } else {
      $elm.addClass('d-none');
    }
  }
});
