var bonusTimes, currentTeam, lastTimerTeam, onTimerComplete, onTimerTick, setTeam, timer, timerTeam, times;

currentTeam = 0;

timerTeam = 0;

lastTimerTeam = 0;

times = [60, 120, 180];

bonusTimes = [30, 20];

timer = null;

setTeam = function(ind) {
  if (ind !== lastTimerTeam) {
    timer.stop();
  }
  timerTeam = ind;
  return lastTimerTeam = timerTeam;
};

onTimerTick = function() {
  var per;
  per = timer.remaining / (timer.remaining + timer.elapsed);
  $('.team').eq(timerTeam).find('.progress').css('width', 100 - per * 100 + '%');
  if (per <= 0) {
    return $('.team').eq(timerTeam).find('.progress').css('width', 0);
  }
};

onTimerComplete = function() {
  return new Audio('audio/buzzer.mp3').play();
};

$(function() {
  timer = new Timer($('#timer'), onTimerTick);
  timer.onComplete = onTimerComplete;
  $('.easy').click(function() {
    setTeam($(this).closest('.team').index('.team'));
    return timer.start(times[0]);
  });
  $('.medium').click(function() {
    setTeam($(this).closest('.team').index('.team'));
    return timer.start(times[1]);
  });
  $('.hard').click(function() {
    setTeam($(this).closest('.team').index('.team'));
    return timer.start(times[2]);
  });
  $('.extend').click(function() {
    setTeam($(this).closest('.team').index('.team'));
    timer.add(bonusTimes[0]);
    return $(this).off('click').addClass('disabled');
  });
  $('.friend').click(function() {
    setTeam($(this).closest('.team').index('.team'));
    timer.add(bonusTimes[1]);
    return $(this).off('click').addClass('disabled');
  });
  $('.stop').click(function() {
    return timer.stop();
  });
  $('.pause').click(function() {
    if ($(this).text() === 'Pause') {
      timer.pause();
      $(this).text('Resume');
      return $('body').addClass('paused');
    } else {
      timer.resume();
      $(this).text('Pause');
      return $('body').removeClass('paused');
    }
  });
  $('.turn').click(function() {
    timer.stop();
    currentTeam = currentTeam === 0 ? 1 : 0;
    return $('.team').eq(currentTeam).addClass('active').siblings().removeClass('active');
  });
  $('.team h2').on('keypress', function(e) {
    var code;
    code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return $(this).blur();
    }
  });
  return $('[title]').powerTip({
    placement: 's'
  });
});
