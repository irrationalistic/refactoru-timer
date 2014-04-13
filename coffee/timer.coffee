###*
 * Gets the current time in milliseconds
 * @return {int} milliseconds
###
getTime = ()-> new Date().getTime()

###*
 * Return milliseconds formatted as mm:ss
 * @param  {int} milliseconds 
 * @return {string}              formatted string
###
formatTime = (milliseconds)->
  seconds = Math.round(milliseconds / 1000)
  minutes = Math.floor(seconds/60)
  seconds -= minutes * 60

  if seconds.toString().length is 1
    seconds = '0'+seconds

  tStr = ''
  if minutes > 0
    tStr += minutes + ':'
  tStr += seconds
  return tStr


###*
 * Base Timer class
###
class Timer

  ###*
   * Timer Class constructor
   * @param  {jQuery object} @element Elemen to attach timer to
  ###
  constructor: (@element, @tickCallback)->
    @startTime = 0
    @endTime = 0
    @isRunning = false
    @pauseStart = -1
    @onComplete = null
    @elapsed = 0
    @remaining = 0

  ###*
   * Timer.start method
   * @param  {int} durationSeconds Total seconds to run for
   * @param  {function} onComplete      Method to call when timer is completed
   * @return {void}                [description]
  ###
  start: (durationSeconds, onComplete)->
    if @updateInterval?
      @stop()

    if onComplete?
      @onComplete = onComplete
      
    @startTime = getTime()
    @endTime = @startTime + (durationSeconds * 1000)
    @isRunning = true
    @updateInterval = null

    do ()=>
      @updateInterval = setInterval ()=>
        @elapsed = getTime() - @startTime
        if @pauseStart > -1
          @elapsed = @pauseStart - @startTime

        @remaining = (@endTime - @startTime) - @elapsed
        # console.log(remaining)

        @element.text( formatTime(@remaining) )
        if @tickCallback?
          @tickCallback()

        if @remaining <= 500
          clearInterval @updateInterval
          @isRunning = false
          if @onComplete?
            @onComplete()
      , 1000
  
  ###*
   * Add more time to the timer
   * @param {int} durationSeconds Number of seconds to add
  ###
  add: (durationSeconds)->
    if @isRunning
      @endTime += durationSeconds * 1000
    else
      @start(durationSeconds)

  ###*
   * Stop the timer and reset it
   * @return {void}
  ###
  stop: ()->
    @isRunning = false
    @pauseStart = -1
    @element.text '00'
    @elapsed = @remaining = 0
    clearInterval @updateInterval
    if @tickCallback?
      @tickCallback()

  ###*
   * Pause the timer
   * @return {void}
  ###
  pause: ()->
    @pauseStart = getTime()

  ###*
   * Resume a paused timer
   * @return {void}
  ###
  resume: ()->
    if @pauseStart > -1
      adjustmentValue = getTime() - @pauseStart
      @startTime += adjustmentValue
      @endTime += adjustmentValue
      @pauseStart = -1