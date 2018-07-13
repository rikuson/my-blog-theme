import $ from 'jquery';
import Feed from '~/model/feed.js';

QUnit.test('Search Posts', assert => {
  let xml = '';
  xml += '<data>';
  xml += '<entry>';
  xml += '<title>Title</title>';
  xml += '<summary>Summary</summary>';
  xml += '<content>Content</content>';
  xml += '<category term="Category" />';
  xml += '<link>Link</link>';
  xml += '<published>Published</published>';
  xml += '</entry>';
  xml += '</data>';
  const feed = new Feed(xml);
  assert.ok(feed.search('Title').length > 0, 'Search by title');
  assert.ok(feed.search('Content').length > 0, 'Search by content');
  assert.ok(feed.search('Category').length > 0, 'Search by category');
});
