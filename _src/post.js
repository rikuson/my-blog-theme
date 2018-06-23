import $ from 'jquery';
import Liquid from 'liquidjs';
import template from '~/_includes/post.html';

const Post = Post || function(data) {
  let _liquid;
  let _view;
  let _data;
  let _$this;

  function __construct(data) {
    _$this = $('');
    _data = data || {};
    _liquid = new Liquid();
    _view = _liquid.parse(template);
    render();
  }

  function setData(data) {
    _data = data;
  }

  function render() {
    _$this.html(_liquid.render(_view, { post: _data }));
  }

  __construct(data);

  return $.extend(_$this, { setData });
}
