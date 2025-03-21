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

  var originalValue = null;


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
  var l = $(`
  <div class="timepicker has-timepicker">
    <div class="title">Select Time</div>
    <div class="chose-all">
      <div class="handle">
        <div class="cell-4"><a class="icon-up js-plus-houer"></a></div>
        <div class="cell-2"></div>
        <div class="cell-4"><a class="icon-up js-plus-minute"></a></div>
      </div>
      <div class="text">
        <div class="cell-4"><a class="js-hour-show" title="Select Hour"></a></div>
        <div class="cell-2">:</div>
        <div class="cell-4"><a class="js-minute-show" title="Select Time"></a></div>
      </div>
      <div class="handle">
        <div class="cell-4"><a class="icon-down js-minus-houer"></a></div>
        <div class="cell-2"></div>
        <div class="cell-4"><a class="icon-down js-minus-minute"></a></div>
      </div>
    </div>
    <div class="chose-hour">
      <ul class="handle">${o}</ul>
    </div>
    <div class="chose-minute">
      <ul class="handle">${c}</ul>
    </div>
  </div>
`);


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
  s.bindEvent = function (settings) {
    var t = this;
    if (!t.hasBind) {
      t.hasBind = true;
      this.content.on('click', '.js-minus-minute', function () {
        t.minute -= settings.minuteIncrement;
        if (t.minute < 0) {
          t.minute += 60;
          t.hour--;
        }
        t.update();
      }).on('click', '.js-plus-minute', function () {
        t.minute += settings.minuteIncrement;
        if (t.minute >= 60) {
          t.minute -= 60;
          t.hour++;
        }
        t.update();
      }).on('click', '.js-plus-houer', function () {
        t.hour += settings.hourIncrement;
        if (t.hour >= 24) {
          t.hour -= 24;
        }
        t.update();
      }).on('click', '.js-minus-houer', function () {
        t.hour -= settings.hourIncrement;
        if (t.hour < 0) {
          t.hour += 24;
        }
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
  t.fn.timepicker = function (options) {
    var defaultOptions = {
      defaultTime: null,
      minuteIncrement: 1,
      hourIncrement: 1,
      minTime: null // Add minTime option with default value null, disabling selecting time lower than minTime
    };

    console.log('timepicker options: ', options)
    var settings = $.extend({}, defaultOptions, options);

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
        bstptid.addClass('easy-timepicker');

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

        // Set the initial hour and minute values based on the defaultTime option
          if (settings.defaultTime === 'now') {
            var currentTime = new Date();
            s = currentTime.getHours();
            o = currentTime.getMinutes();

            console.log('set if now  time - '+ s+':'+o);

            //compare current time with input value if set
            var inputValue = this.value;
            var [inputHour, inputMinute] = inputValue.split(':').map(Number);

            if (!isNaN(inputHour) && !isNaN(inputMinute) && inputHour < 24 && inputMinute < 60) {
              s = (s > inputHour) ? s : inputHour;
              o = (o > inputMinute) ? o : inputMinute;

              console.log('set if 2  time - '+ s+':'+o);
            }
          }
          if (typeof settings.defaultTime === 'string' && e.test(settings.defaultTime)) {
            var defaultTimeArray = settings.defaultTime.split(':');
            s = +defaultTimeArray[0];
            o = +defaultTimeArray[1];
            console.log('set else if  time - '+ s+':'+o);
          }

          // Limit the minimum time if minTime option is set
          if (settings.minTime !== null && e.test(settings.minTime)) {
            var minTimeArray = settings.minTime.split(':');
            var minHour = +minTimeArray[0];
            var minMinute = +minTimeArray[1];

            // If the selected time is earlier than the minimum time, set it to the minimum time
            if (s < minHour || (s === minHour && o < minMinute)) {
              s = minHour;
              o = minMinute;
              console.log('set new time - '+ s+':'+o);
              console.log('set new time minHour - '+ minHour+':'+minMinute);
            }else {
              console.log('dont set new time - '+ s+':'+o);
              console.log('set new time minHour - '+ minHour+':'+minMinute);
            }
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
        t.timepicker.bindEvent(settings);
        i.stopPropagation();

        // Close the timepicker when clicking outside
        u.one('click', function () {
          l.content.off().remove();
          l.hasBind = false;

          // Check if the input value matches the time format and minTime is followed
          inputValue = bstptid.val();
          if (e.test(inputValue)) {
            var inputTimeArray = inputValue.split(":");
            var inputHour = +inputTimeArray[0];
            var inputMinute = +inputTimeArray[1];

            //var inputHour = l.hour;
            //var inputMinute = l.minute;
            console.log('l: ', l);
            var minTimeArray = settings.minTime.split(':');
                  var minHour = +minTimeArray[0];
                  var minMinute = +minTimeArray[1];

            // Limit the minimum time if minTime option is set
            if (
              settings.minTime !== null &&
              e.test(settings.minTime) &&
              (inputHour < minHour || (inputHour === minHour && inputMinute < minMinute))
            ) {
              bstptid.val(minHour + ":" + minMinute);
            console.log('if inputValue - ', inputValue);
            l.hour = s;
              l.minute = o;
              l.update();
              i.stopPropagation();

            }else {
              console.log('else inputValue - ', inputValue);
            }

            console.log('inputValue  inputHour:inputMinute- ', inputHour + ':'+ inputMinute);
            console.log('inputValue minHour:minMinute- ', minHour + ':'+ minMinute);
          }

          bstptid.trigger('change');
        });
      });

      // Attach click event handler to the input element
      /*this.off("click").on("click", function (i) {
         // Store the original input value
        originalValue = this.value;
      });
      */

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
