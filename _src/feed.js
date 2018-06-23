import $ from 'jquery';
import lunr from 'lunr';

/**
 * @example
 * var feed = new Feed();
 * $search_box.on('free', function() {
 *   var data = feed.search($search_box.getVal());
 *   $post_list.setData(data).render();
 * })
 */
const Feed = Feed || function(url) {
  let _data;
  let _index;

  async function __construct(url) {
    _data = await fetchXmlData(url);
    _index = lunr(function() {
      this.field('title');
      this.field('category');
      this.field('content');
      _data.forEach(d => this.add(d));
    });
  }

  async function fetchXmlData(url) {
    const xml = await $.ajax({ url, dataType: 'xml' });
    // get entry data
    const $entries = $(xml).find('entry');
    // jQuery.map()
    // not native Array.map()
    const $data = $entries.map(function() {
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
    const result = _index.search(keyword);
    return result.map((val, i) => _data[val.ref]);
  }

  __construct(url);

  return { search };
}

export default Feed;
