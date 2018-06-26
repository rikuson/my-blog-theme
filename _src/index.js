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
  const post_ids = $.makeArray($posts.find('[data-id]').map(function() {
    return $(this).data('id');
  }));
  const $message = $('#search_message');

  // search event
  $search_box.on('free', renderPosts);

  function renderPosts() {
    const res_ids = feed.search($search_box.val());

    for (let i = 1; i <= post_ids.length; i++) {
      const post_id = post_ids[i - 1];
      const $post = $posts.find(`[data-id="${post_id}"]`);
      if (res_ids.includes(post_id)) {
        $post.show();
      } else {
        $post.hide();
      }
    }

    if (res_ids.length === 0) {
      $message.show();
    } else {
      $message.hide();
    }
  }
});
