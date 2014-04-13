/**
 * Gets the current time in milliseconds
 * @return {int} milliseconds
 */
var getTime = function(){
    return new Date().getTime();
};

/**
 * Return milliseconds formatted as mm:ss
 * @param  {int} milliseconds 
 * @return {string}              formatted string
 */
var formatTime = function(milliseconds){
    var seconds = Math.round(milliseconds / 1000);
    var minutes = Math.floor(seconds/60);
    seconds -= minutes * 60;

    if(seconds.toString().length == 1)
        seconds = '0'+seconds;

    var tStr = '';
    if(minutes > 0)
        tStr += minutes + ':';
    tStr += seconds;
    return tStr;
};

/**
 * Timer Class constructor
 * @param {jQuery object} el Element to attach timer to
 */
var Timer = function(el) {
    this.startTime = 0;
    this.endTime = 0;
    this.element = el;
    this.isRunning = false;
    this.pauseStart = -1;
    this._onComplete = null;
};

/**
 * Timer.start method
 * @param  {int} durationSeconds Total seconds to run for
 * @param  {function} onComplete      Method to call when timer is completed
 * @return {void}
 */
Timer.prototype.start = function(durationSeconds, onComplete){
    if(this.updateInterval !== null){
        this.stop();
    }
    this.startTime = getTime();
    this.endTime = this.startTime + (durationSeconds * 1000);
    this._onComplete = onComplete;
    this.isRunning = true;
    this.updateInterval = null;

    (function(timer){
        timer.updateInterval = setInterval(function(){
            var elapsed = getTime() - timer.startTime;
            if(timer.pauseStart > -1){
                // this timer is currently paused
                elapsed = timer.pauseStart - timer.startTime;
            }
            var remaining = (timer.endTime - timer.startTime) - elapsed;
            console.log(remaining);

            timer.element.text( formatTime(remaining) );

            if(remaining <= 500){
                clearInterval(timer.updateInterval);
                timer.isRunning = false;
                if(timer._onComplete)
                    timer._onComplete();
            }
        }, 1000);

    })(this);
};

/**
 * Stop the timer and reset it
 * @return {void}
 */
Timer.prototype.stop = function(){
    this.isRunning = false;
    this.pauseStart = -1;
    this.element.text( '00' );
    clearInterval(this.updateInterval);
};

/**
 * Add more time to the timer
 * @param {int} durationSeconds Number of seconds to add
 */
Timer.prototype.add = function(durationSeconds) {
    if(this.isRunning)
        this.endTime += durationSeconds * 1000;
    else
        this.start(durationSeconds);
};

/**
 * Pause the timer
 * @return {void}
 */
Timer.prototype.pause = function() {
    this.pauseStart = getTime();
};

/**
 * Resume a paused timer
 * @return {void}
 */
Timer.prototype.resume = function() {
    if(this.pauseStart > -1){
        var adjustmentValue = getTime() - this.pauseStart;
        this.startTime += adjustmentValue;
        this.endTime += adjustmentValue;
        this.pauseStart = -1;
    }
};
