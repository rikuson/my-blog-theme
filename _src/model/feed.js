import $ from 'jquery';
import lunr from 'lunr';

/**
 * @example
 * var feed = new Feed();
 * $search_box.on('ready', function() {
 *   var data = feed.search($search_box.getVal());
 *   $post_list.setData(data).render();
 * })
 */
const Feed = Feed || function(xml) {
  let _data;
  let _index;

  function __construct(xml) {
    _data = formatXmlData(xml);
    _index = lunr(function() {
      this.field('title');
      this.field('category');
      this.field('content');
      _data.map(d => this.add(d));
    });
  }

  function formatXmlData(xml) {
    // get entry data
    const $entries = $(xml).find('entry');
    // jQuery.map()
    // not native Array.map()
    const $data = $entries.map(function(i) {
      return {
        id: $entries.index(this),
        title: $(this).find('title').text(),
        excerpt: $(this).find('summary').text(),
        content: $(this).find('content').text(),
        category: $(this).find('category').attr('term'),
        url: $(this).find('link').attr('href'),
        date: $(this).find('published').text(),
      };
    });
    return $.makeArray($data);
  }

  function search(keyword) {
    return _index.search(keyword).map(val => Number(val.ref) + 1);
  }

  __construct(xml);

  return { search };
}

export default Feed;
