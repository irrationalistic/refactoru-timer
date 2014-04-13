
/**
 * Gets the current time in milliseconds
 * @return {int} milliseconds
 */
var Timer, formatTime, getTime;

getTime = function() {
  return new Date().getTime();
};


/**
 * Return milliseconds formatted as mm:ss
 * @param  {int} milliseconds 
 * @return {string}              formatted string
 */

formatTime = function(milliseconds) {
  var minutes, seconds, tStr;
  seconds = Math.round(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }
  tStr = '';
  if (minutes > 0) {
    tStr += minutes + ':';
  }
  tStr += seconds;
  return tStr;
};


/**
 * Base Timer class
 */

Timer = (function() {

  /**
   * Timer Class constructor
   * @param  {jQuery object} @element Elemen to attach timer to
   */
  function Timer(element, tickCallback) {
    this.element = element;
    this.tickCallback = tickCallback;
    this.startTime = 0;
    this.endTime = 0;
    this.isRunning = false;
    this.pauseStart = -1;
    this.onComplete = null;
    this.elapsed = 0;
    this.remaining = 0;
  }


  /**
   * Timer.start method
   * @param  {int} durationSeconds Total seconds to run for
   * @param  {function} onComplete      Method to call when timer is completed
   * @return {void}                [description]
   */

  Timer.prototype.start = function(durationSeconds, onComplete) {
    if (this.updateInterval != null) {
      this.stop();
    }
    if (onComplete != null) {
      this.onComplete = onComplete;
    }
    this.startTime = getTime();
    this.endTime = this.startTime + (durationSeconds * 1000);
    this.isRunning = true;
    this.updateInterval = null;
    return (function(_this) {
      return function() {
        return _this.updateInterval = setInterval(function() {
          _this.elapsed = getTime() - _this.startTime;
          if (_this.pauseStart > -1) {
            _this.elapsed = _this.pauseStart - _this.startTime;
          }
          _this.remaining = (_this.endTime - _this.startTime) - _this.elapsed;
          _this.element.text(formatTime(_this.remaining));
          if (_this.tickCallback != null) {
            _this.tickCallback();
          }
          if (_this.remaining <= 500) {
            clearInterval(_this.updateInterval);
            _this.isRunning = false;
            if (_this.onComplete != null) {
              return _this.onComplete();
            }
          }
        }, 1000);
      };
    })(this)();
  };


  /**
   * Add more time to the timer
   * @param {int} durationSeconds Number of seconds to add
   */

  Timer.prototype.add = function(durationSeconds) {
    if (this.isRunning) {
      return this.endTime += durationSeconds * 1000;
    } else {
      return this.start(durationSeconds);
    }
  };


  /**
   * Stop the timer and reset it
   * @return {void}
   */

  Timer.prototype.stop = function() {
    this.isRunning = false;
    this.pauseStart = -1;
    this.element.text('00');
    this.elapsed = this.remaining = 0;
    clearInterval(this.updateInterval);
    if (this.tickCallback != null) {
      return this.tickCallback();
    }
  };


  /**
   * Pause the timer
   * @return {void}
   */

  Timer.prototype.pause = function() {
    return this.pauseStart = getTime();
  };


  /**
   * Resume a paused timer
   * @return {void}
   */

  Timer.prototype.resume = function() {
    var adjustmentValue;
    if (this.pauseStart > -1) {
      adjustmentValue = getTime() - this.pauseStart;
      this.startTime += adjustmentValue;
      this.endTime += adjustmentValue;
      return this.pauseStart = -1;
    }
  };

  return Timer;

})();
