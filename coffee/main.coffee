currentTeam = 0
timerTeam = 0;
lastTimerTeam = 0;

times = [60, 120, 180]
bonusTimes = [30, 2]

timer = null

setTeam = (ind)->
  if ind isnt lastTimerTeam
    timer.stop()
    

  timerTeam = ind
  lastTimerTeam = timerTeam

onTimerTick = ()->
  # on tick
  per = (timer.remaining / (timer.remaining + timer.elapsed))
  # console.log per
  $('.team').eq(timerTeam).find('.progress').css 'width', 100 - per * 100 + '%'
  if per <= 0
    $('.team').eq(timerTeam).find('.progress').css 'width', 0

onTimerComplete = ()->
  new Audio('audio/buzzer.mp3').play()

$ ->
  
  timer = new Timer $('#timer'), onTimerTick
  timer.onComplete = onTimerComplete

  # connect button controls to timer
  $('.easy').click ()->
    setTeam $(this).closest('.team').index('.team')
    timer.start times[0]

  $('.medium').click ()->
    setTeam $(this).closest('.team').index('.team')
    timer.start times[1]

  $('.hard').click ()->
    setTeam $(this).closest('.team').index('.team')
    timer.start times[2]

  $('.extend').click ()->
    setTeam $(this).closest('.team').index('.team')
    timer.add bonusTimes[0]
    $(this).off('click').addClass('disabled')

  $('.friend').click ()->
    setTeam $(this).closest('.team').index('.team')
    timer.add bonusTimes[1]
    $(this).off('click').addClass('disabled')

  $('.stop').click ()->
    timer.stop()


  # add pause control and toggle the text
  $('.pause').click ()->
    if $(this).text() is 'Pause'
      timer.pause()
      $(this).text 'Resume'
      $('body').addClass 'paused'
    else
      timer.resume()
      $(this).text 'Pause'
      $('body').removeClass 'paused'

  # allow switching turns between teams
  $('.turn').click ()->
    currentTeam = if currentTeam is 0 then 1 else 0
    $('.team')
      .eq(currentTeam)
      .addClass('active')
      .siblings()
      .removeClass('active')


  # blur the contenteditable team names
  $('.team h2').on 'keypress', (e)->
    code = e.keyCode || e.which;
    if code is 13
      e.preventDefault()
      $(this).blur()


  # tooltips initialization
  $('[title]').powerTip
    placement: 's'