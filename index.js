var is_ticking = false;
var is_stopped = true;
var last_event = null;
// Batch of functions to be called on start and end scroll
var scroll_start = [];
var scroll_end = [];
var scroll_interval = [];

var timer = null;
var interval = null;
var top = 0;

var on_scroll = function (e) {
  last_event = e;
  // To optimize perfomance execute scroll handler no more thatn 10 times a second
  if (!interval) {
    interval = setTimeout(function () {
      // Get offset at start of animation frame cuz it trigger force layout reflow
      window.requestAnimationFrame(function() {
        top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

        if (is_stopped) {
          is_stopped = false;
          window.requestAnimationFrame(reflow);
        }

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function() {
          window.requestAnimationFrame(timeout_fn);
        }, 200);

        if (!is_ticking) {
          is_ticking = true;
          window.requestAnimationFrame(interval_fn);
        }
      });
      interval = null;
    }, 100);
  }
};

var run = function (functions) {
  var i;
  for (i in functions) {
    functions[i](last_event, top);
  }
};

var reflow = function() {
  run(scroll_start);
};

 // Function calls when scroll is stopped
var timeout_fn = function () {
  run(scroll_end);
  is_stopped = true;
};

// Using for callbacks that need smooth rendering
interval_fn = function() {
  run(scroll_interval);
  is_ticking = false;
};

window.addEventListener('scroll', on_scroll, false);
module.exports = function (opts) {
  scroll_start.push(opts.start);
  scroll_interval.push(opts.interval);
  scroll_end.push(opts.end);
};
