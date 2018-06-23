import $ from 'jquery';
import Liquid from 'liquidjs';

/**
 * @example
 * let feed = new Feed(lunr);
 * $search_box.on('free', () => {
 *   var posts = feed.search(val);
 *   $contents_box.setPostData(posts);
 * });
 */
const SearchBox = SearchBox || function($this) {
  const DELAY_TIME = 1000;
  const FREE_CLASS = 'fa-search';
  const BUSY_CLASS = 'fa-circle-notch';

  let _$this;
  let _$input;
  let _$icon;
  let _busy;
  let _liquid;
  let _val;

  function __construct($this) {
    _$this = $this;
    _liquid = new Liquid();
    _$input = _$this.find('input');
    _$input.val('');
    _$icon = _$this.find('.fas');

    release();

    _$input.on('keyup', lock);
  }

  function lock() {
    _busy = true;
    setTimeout(release, DELAY_TIME);
    render();
  }

  function release() {
    _busy = false
    _$this.trigger('free');
    render();
  }

  function val() {
    return _$input.val();
  }

  function render() {
    if (_busy) {
      _$icon.removeClass(FREE_CLASS).addClass(BUSY_CLASS);
    } else {
      _$icon.removeClass(BUSY_CLASS).addClass(FREE_CLASS);
    }
  }

  __construct($this);

  return $.extend(_$this, { val });
};

export default SearchBox;
