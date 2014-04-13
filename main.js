// initialize
var currentTeam = 0;
$(function(){

    // create the root timer
    var timer = new Timer($('#timer'));

    // connect button controls to timer
    $('.easy').click(function(){ timer.start(60); });
    $('.medium').click(function(){ timer.start(120); });
    $('.hard').click(function(){ timer.start(180); });
    $('.extend').click(function(){ timer.add(30); $(this).off('click').addClass('disabled'); });
    $('.friend').click(function(){ timer.add(20); $(this).off('click').addClass('disabled'); });
    $('.stop').click(function(){ timer.stop(); });

    // add pause control and toggle the text
    $('.pause').click(function () {
        if($(this).text() === 'Pause'){
            timer.pause();
            $(this).text('Resume');
            $('body').addClass('paused');
        } else {
            timer.resume();
            $(this).text('Pause');
            $('body').removeClass('paused');
        }
    });

    // allow switching turns between teams
    $('.turn').click(function () {
        if(currentTeam === 0)
            currentTeam = 1;
        else
            currentTeam = 0;

        $('.team').eq(currentTeam).addClass('active').siblings().removeClass('active');
    })

    // blur the contenteditable team names
    $('.team h2').on('keypress',function(e) {
       var code = e.keyCode || e.which;
       if(code == 13) {
          e.preventDefault();
          $(this).blur();
       }
    });

    // tooltips initialization
    $('[title]').powerTip({
        placement: 's'
    });
});
