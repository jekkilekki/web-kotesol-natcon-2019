$( '.site-mobile-menu-button' ).click( function() {
  if ( $( '.site-navigation.mobile-menu' ).hasClass( 'active' ) ) {  
    $( '.site-navigation.mobile-menu' ).removeClass( 'active'); 
  } else { 
    $( '.site-navigation.mobile-menu' ).addClass( 'active' ); 
  }
});

$( '.site-navigation.mobile-menu .site-menu' ).on( 'click', function() {
  $( '.site-navigation.mobile-menu' ).removeClass( 'active' );
});

$( '.benefit-title' ).click( function() {
  if ( $(this).hasClass( 'active' ) ) {
    var elem = $(this);
    $(this).next().slideToggle( 'fast', function() {
      elem.removeClass('active');
    });
  } else {
    $(this).addClass('active');
    $(this).next().slideToggle();
  }
});

/* Back to Top Button */
$( document ).ready( function() {
  var offset = 100;
  var speed = 250;
  var duration = 500;

  /* Initial page load */
  // buttonAndBanner( )

  if ( $(window).scrollTop() < offset ) {
    $( '.topbutton' ).fadeOut( duration );
    if ( $( 'body' ).attr('id') == 'home' ) {
      $( '.site-banner' ).addClass( 'top' );
    }
  } else {
    $( '.topbutton' ).fadeIn( duration );
    $( '.site-banner' ).removeClass( 'top' );
  }

  $( window ).scroll( function() {
    if ( $(this).scrollTop() < offset ) {
      $( '.topbutton' ).fadeOut( duration );
      if ( $( 'body' ).attr('id') == 'home' ) {
        $( '.site-banner' ).addClass( 'top' );
      }
    } else {
      $( '.topbutton' ).fadeIn( duration );
      $( '.site-banner' ).removeClass( 'top' );
    }
  });
  $( '.topbutton' ).on( 'click', function() {
    $( 'html, body' ).animate({ scrollTop: 0 }, speed );
    return false;
  });

  /* Index page - top bar */
  // if( $( 'body' ).id( 'home' ) ) {
  //   $(window)
  // }
});

/**
 * Date Countdown timer
 * @link https://codepen.io/chrisjdesigner/pen/dMbmoE
 */
var winHeight = $(document).height();
var winWidth = $(document).width();
var thisYear = new Date();
var thisChristmas = thisYear.getFullYear() + "/05/25 09:00:00";
var christmas = new Date( thisChristmas ),
    days, hours, mins, secs;

$('.this-year').text( thisYear.getFullYear() );

//var setPieChart = function(name) {
  //var num = name,
//      fixedNumber = num,
//      result = fixedNum + ' ' + total;
//  pie.style.strokeDasharray = 25;
//}

function showToday() {
  var date = thisYear.getDate();
  // var date = 2;
  $('.day-list li:nth-child(' + date + ')').addClass('today');
  
  $('#container #inner').css({"margin-left": -(date-1) * winWidth + "px"});
  
  var fgifts = $( '.day-list li' );
  $.each( fgifts, function( i, obj ) {
    if( i+1 <= date ) $(this).removeClass('disabled'); 
    if( i+1 == date ) $(this).addClass( 'today' );
    if( i+1 > date ) { $(this).addClass('disabled');
                      $(this).unbind('click');
    }
  });
  
  $('#posts .post').css({"display":"none"});
  $('#posts .post:nth-child(' + date + ')').css({"display":"block"});
}

$( '.disabled' ).click( function(e) {
  e.preventDefault();
  alert( 'Cheatin\' huh?' );
});

$(function() {
  // Calculate time to Christmas
  showToday();
  timeToXmas();
  // Transition from 0
  numberTrans( '#days .number', days, 1000, 'easeOutQuad' );
  numberTrans( '#hours .number', hours, 1000, 'easeOutQuad' );
  numberTrans( '#minutes .number', mins, 1000, 'easeOutQuad' );
  numberTrans( '#seconds .number', secs, 1000, 'easeOutQuad' );
  // Begin countdown
  setTimeout( countdownTimer, 1001 );
});

// function to calc Time to Christmas
function timeToXmas() {
  var today = new Date(); 
  // diff between dates
  var diff = (today - christmas)/1000;
  var diff = Math.abs(Math.floor(diff));
  
  // Day to target
  days = Math.floor(diff/(24*60*60));
  secs = diff - days * 24*60*60;
  // Hours
  hours = Math.floor(secs/(60*60));
  secs = secs - hours * 60*60;
  // Minutes
  mins = Math.floor(secs/60);
  secs = secs - mins * 60;
}

// function to display the countdown Timer
function countdownTimer() {
  timeToXmas();
  // display in front-end clock
  // Seems like multiplying by 360(degrees) gives an inaccurate measure - 315 is the proper number to be an even division of the pie graph clock
  $( '#days .number' ).text(days);
  var dayResult = 315*(days/25) + ' ' + 360;
  $( '#days .pie' ).css( { "stroke-dasharray": dayResult } );
  $( '#hours .number' ).text(hours);
  var hrResult = 315*(hours/24) + ' ' + 360;
  $( '#hours .pie' ).css( { "stroke-dasharray": hrResult } );
  $( '#minutes .number' ).text(mins);
  var minResult = 315*(mins/60) + ' ' + 360;
  $( '#minutes .pie' ).css( { "stroke-dasharray": minResult } );
  $( '#seconds .number' ).text(secs);
  var secResult = 315*(secs/60) + ' ' + 360;
  $( '#seconds .pie' ).css( { "stroke-dasharray": secResult } );
  // repeat every second
  setTimeout(countdownTimer, 1000);
}

// Transition numbers
function numberTrans( id, endpt, transDur, transEase ) {
  $({numberCount: $(id).text()}).animate({numberCount: endpt}, {
    duration: transDur,
    easing: transEase,
    step: function() {
      $(id).text(Math.floor(this.numberCount));
    },
    complete: function() {
      $(id).text(this.numberCount);
    }
  });
};