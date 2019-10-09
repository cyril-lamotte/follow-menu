

/**
 * Unmask/Mask password fields.
 *
 * @param {String} trigger_selector - CSS selector for the trigger
 * @param {Object} options - Settings.
 */
var followMenu = function(trigger_selector, options) {

  // Default options
  var defaults = {
    'prefix': 'follow-menu',
    'indicator': '.menu__indicator',
    'item_tag': 'li',
    'active_class': 'is-active'
  }

  var p = {}; // Plugin.
  p.settings = {};

  // Get triggers and add events listeners.
  var wrap = document.querySelectorAll(trigger_selector);

  /**
   * Plugin initialisation.
   *
   * @param {Element} el - trigger
   */
  p.init = function(el) {

    // Merge user's options.
    p.settings = Object.assign(defaults, options);
    p.menu = el;

    // Add base class on menu wrap.
    p.menu.classList.add(p.settings.prefix);

    // Get indicator element.
    p.settings.$indicator = p.menu.querySelector(p.settings.indicator);

    // Get all menu items.
    p.settings.menu_items = p.menu.querySelectorAll('li');

    var first_item_active = p.settings.menu_items[0];
    var active_item = p.menu.querySelector(p.settings.item_tag + '.' +  p.settings.active_class);

    if (active_item) {
      first_item_active = active_item;
    }

    // Initialise the indicator.
    setIndicatorPosition(first_item_active);

    // Avoid the first animation by setting CSS transitions after first load.
    window.setTimeout(function() {
      p.menu.classList.add(p.settings.prefix + '--init');
    }, 10);

    // Add event listeners.
    addListeners();

  };


  /**
   * Define size & position of the indicator.
   */
  var setIndicatorPosition = function($ref) {

    // Remove current attribute.
    p.settings.menu_items.forEach(function(item) {
      item.removeAttribute('data-follow-menu');
    });

    var ref_pos  = $ref.getBoundingClientRect();
    var wrap_pos = p.menu.getBoundingClientRect();

    // Compute the new position.
    var left = ref_pos.x - wrap_pos.x;
    var top = ref_pos.y - wrap_pos.y + ref_pos.height;

    // Apply transform.
    p.settings.$indicator.setAttribute('style', 'transform: translate3d(' + left + 'px, ' + top + 'px, 0) scaleX(' + ref_pos.width + ');');

    $ref.setAttribute('data-follow-menu', 'current');

  };


  /**
   * Refresh indicator position (ex: on resize of the viewport).
   */
  var refreshPosition = function() {
    var current = p.menu.querySelector('[data-follow-menu="current"]');
    setIndicatorPosition(current);
  }


  /**
   * Add event listeners.
   */
  var addListeners = function() {

    p.settings.menu_items.forEach(function(item) {

      item.addEventListener('mouseenter', function(event) {
        setIndicatorPosition(this);
      });

    });

    window.addEventListener('resize', throttle(refreshPosition, 250));

  };

  var throttle = function(callback, delay) {
    var last;
    var timer;

    return function () {
      var context = this;
      var now = +new Date();
      var args = arguments;
      if (last && now < last + delay) {
        // Delay is not finish, reset the timer.
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          callback.apply(context, args);
        }, delay);
      } else {
        last = now;
        callback.apply(context, args);
      }
    };

  }


  // Init plugin for each element.
  wrap.forEach(function(el) {
    p.init(el);
  });

};
