$( '.site-mobile-menu-button' ).click( function() {
  if ( $( '.site-navigation.mobile-menu' ).hasClass( 'active' ) ) {  
    $( '.site-navigation.mobile-menu' ).removeClass( 'active'); 
  } else { 
    $( '.site-navigation.mobile-menu' ).addClass( 'active' ); 
  }
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