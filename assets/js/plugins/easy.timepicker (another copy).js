/*!
 * Bootstrap Timepicker
 * @author Amir Hussain
 * modified by Anoxxxy
 * change: added trigger change event on close
 **/

// Check for AMD or CommonJS environment
var bstptid = '';
(function (t, i) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], i);
  } else if (typeof exports === 'object') {
    module.exports = i(require('jquery'));
  } else {
    t.$ = i(t.jQuery);
  }
})(this, function (t) {
  "use strict";

  // Helper function to add leading zeros to numbers
  var i = function (t) {
    return t >= 10 ? t + '' : '0' + t;
  };

  // Regular expression for validating time format
  var e = /^[0-9]{1,2}:[0-9]{1,2}$/;

  // Empty object for storing timepicker related functions and elements
  var s = {};

  // Empty function for timepicker update
  var n = function () {};

  // Generate HTML for hour and minute cells
  var o = new Array(24).fill(null).map(function (t, e) {
    var s = i(e);
    return '<li class="cell-2 js-hour-cell" data-val="' + s + '">' + s + '</li>';
  }).join('');

  var c = new Array(12).fill(null).map(function (t, e) {
    var s = i(5 * e);
    return '<li class="cell-2 js-minute-cell" data-val="' + s + '">' + s + '</li>';
  }).join('');

  // Create the timepicker HTML structure
  var l = t('<div class="timepicker has-timepicker" >' +
    '\t\t<div v-show class="title">Select Time</div>' +
    '\t\t\t<div class="chose-all">' +
    '\t\t\t\t<div class="handle">' +
    '\t\t\t\t\t<div class="cell-4"><a class="icon-up js-plus-houer"></a></div>' +
    '\t\t\t\t\t<div class="cell-2"></div>' +
    '\t\t\t\t\t<div class="cell-4"><a class="icon-up js-plus-minute"></a></div>' +
    '\t\t\t\t</div>' +
    '\t\t\t\t<div class="text">' +
    '\t\t\t\t\t<div class="cell-4"><a class="js-hour-show" title="é€‰æ‹©æ—¶"></a></div>' +
    '\t\t\t\t\t<div class="cell-2">:</div>' +
    '\t\t\t\t\t<div class="cell-4"><a class="js-minute-show" title="Select Time"></a></div>' +
    '\t\t\t\t</div>' +
    '\t\t\t\t<div class="handle">' +
    '\t\t\t\t\t<div class="cell-4"><a class="icon-down js-minus-houer"></a></div>' +
    '\t\t\t\t\t<div class="cell-2"></div>' +
    '\t\t\t\t\t<div class="cell-4"><a class="icon-down js-minus-minute"></a></div>' +
    '\t\t\t\t</div>' +
    '\t\t\t</div>' +
    '\t\t\t<div class="chose-hour">' +
    '\t\t\t\t<ul class="handle">' + o + '</ul>' +
    '\t\t\t</div>' +
    '\t\t\t<div class="chose-minute">' +
    '\t\t\t\t<ul class="handle">' + c + '</ul>' +
    '\t\t\t</div>' +
    '\t\t</div>' +
    '\t</div>');

  // Update the timepicker HTML with appropriate values
  l.find('a').attr('href', 'javascript:void(0);');
  s.content = l;
  s.title = l.find('.title');
  s.choseAll = l.find('.chose-all');
  s.choseMinute = l.find('.chose-minute');
  s.choseHour = l.find('.chose-hour');
  s.hourShow = l.find('.js-hour-show');
  s.minuteShow = l.find('.js-minute-show');

  // Update the timepicker with the selected hour and minute
  s.update = function () {
    return bstptid.val(i(this.hour) + ':' + i(this.minute)),
      this.minuteShow.text(i(this.minute)),
      this.hourShow.text(i(this.hour)),
      this.inputTarget.$timepickerUpdate(),
      this;
  };

  // Bind event listeners for the timepicker
  s.bindEvent = function () {
    var t = this;
    if (!t.hasBind) {
      t.hasBind = true;
      this.content.on('click', '.js-minus-minute', function () {
        t.minute <= 0 ? t.minute = 59 : t.minute--;
        t.update();
      }).on('click', '.js-plus-minute', function () {
        t.minute >= 59 ? t.minute = 0 : t.minute++;
        t.update();
      }).on('click', '.js-plus-houer', function () {
        t.hour >= 23 ? t.hour = 0 : t.hour++;
        t.update();
      }).on('click', '.js-minus-houer', function () {
        t.hour <= 0 ? t.hour = 23 : t.hour--;
        t.update();
      }).on('click', '.js-minute-cell', function () {
        t.minute = +this.getAttribute('data-val');
        t.update();
        t.choseMinute.hide();
        t.choseAll.show();
        t.title.text('Select Time');
      }).on('click', '.js-hour-cell', function () {
        t.hour = +this.getAttribute('data-val');
        t.update();
        t.choseHour.hide();
        t.choseAll.show();
        t.title.text('Select Time');
      }).on('click', function (t) {
        t.stopPropagation();
      });

      t.hourShow.on('click', function () {
        t.choseAll.hide();
        t.choseHour.show();
        t.title.text('Select Time');
      });

      t.minuteShow.on('click', function () {
        t.choseAll.hide();
        t.choseMinute.show();
        t.title.text('Select Time');
      });
    }
  };

  // Add timepicker functionality to the jQuery object
  t.timepicker = s;
  t.fn.timepicker = function (i) {
    var s, o, c = this,
      l = t.timepicker,
      u = t('html');

    if (this[0].nodeName && this[0].nodeName === 'INPUT') {
      // Define the timepicker update function
      this.$timepickerUpdate = n;

      // Attach click event handler to the input element
      this.off('click').on('click', function (i) {
        var n = this.value;
        bstptid = $(this);

        // Check if the input value matches the time format
        if (e.test(n)) {
          n = n.split(':');
          s = +n[0];
          o = +n[1];
        } else {
          n = new Date();
          s = n.getHours();
          o = n.getMinutes();
        }

        // Determine the position of the timepicker relative to the input element
        if ($(this).closest('table').length > 0) {
          var pos = $(this).offset();
          var h = pos.left + 'px',
            a = pos.top + this.offsetHeight + 'px';
        } else {
          var h = this.offsetLeft + 'px',
            a = this.offsetTop + this.offsetHeight + 'px';
        }

        // Append the timepicker HTML and set the initial hour and minute values
        l.inputTarget = c;
        l.content.appendTo(this.offsetParent).css({
          left: h,
          top: a
        });
        l.hour = s;
        l.minute = o;
        l.choseAll.show();
        l.choseHour.hide();
        l.choseMinute.hide();
        l.update();
        t.timepicker.bindEvent();
        i.stopPropagation();

        // Close the timepicker when clicking outside
        u.one('click', function () {
          l.content.off().remove();
          l.hasBind = false;
          bstptid.trigger('change');
        });
      });

      // Prevent typing in the input field
      this.off('keydown').on('keydown', function () {
        return false;
      });

      // Define the update method for the timepicker
      this.update = function (i) {
        t.isFunction(i) ? this.$timepickerUpdate = i : this.$timepickerUpdate = n;
      };

      return this;
    }
  };

    // Add a click event listener to the document to close the timepicker when clicking outside
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.has-timepicker').length) {
        $('.has-timepicker').remove();
        t.timepicker.hasBind = false;
      }
    });


  return t;
});
