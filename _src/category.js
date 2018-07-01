import $ from 'jquery';
import 'bootstrap';
import SearchBox from './search_box.js';
import Feed from './feed.js';
import AutoComplete from './auto_complete.js';

$(async function() {
  // open external link as new tab
  $('a[href^="http"]').attr('target', '_blank');

  const xml = await $.ajax({ url: '/feed.xml', dataType: 'xml' });
  const feed = new Feed(xml);
  const $search_box = new SearchBox($('#search_box'));

  const $posts = $('#posts');
  const { keyword } = getQuery();
  const res_ids = feed.search(keyword);
  show($posts.find('[data-id]'));
  $search_box.val(keyword);

  const $auto_complete = new AutoComplete('#auto_complete');
  // search event
  $search_box.on('free', () => {
    if ($search_box.val().length === 0) {
      $auto_complete.hide();
    } else {
      const ids = feed.search($search_box.val());
      $auto_complete.display(ids);
    }
  });
});

function getQuery() {
  const query = { keyword: '' };
  const param_str = location.search.slice(1);
  param_str.split('&').map(str => {
    const tmp = str.split('=');
    query[tmp[0]] = tmp[1];
  });
  return query;
}

function show($elm) {
  $elm.removeClass('d-none');
}
