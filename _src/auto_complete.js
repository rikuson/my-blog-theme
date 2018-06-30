/**
 * 
 */
const AutoComplete = AutoComplete || function(selector) {
  let _$this;
  let _$link;

  function __construct(selector) {
    _$this = $(selector);
    _$link = _$this.find('.dropdown-item:last-child');
  }

  function display(data) {
    data.length === 0 ? _$this.hide() : _$this.show();
    _$this.find('[data-id]').hide();
    // $(`[data-id={${data.join(',')}}]`).show();
    data.forEach(id => _$this.find(`[data-id="${id}"]`).show());
  }

  __construct(selector);

  return $.extend(_$this, { display });
};

export default AutoComplete;
