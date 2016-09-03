var searchterm = false;
var oldsearchterm = false;
var counter = 1;
function clearHighlights() {
  $('#main').removeHighlight();
  // $('.productsearchstringnotification,.restaurantsearchstringnotification').fadeOut();
  highlightcounter = 0;
}


function searchPrompt(searchterm) {

  /* Make sure that we are on the menucard tab */
  if (window.modrewriteprefix == undefined) {
    window.modrewriteprefix = '/';
  }

  var categoryitem = $(this);
  /* if the infotabs are present AND we're not on the menucard tab already, do that first */

    if (oldsearchterm != searchterm)  {
      counter = 1;
      oldsearchterm = searchterm;

      clearHighlights();
      $('#main').highlight(searchterm);
    }
    else
    {
      counter++;
     }

    scrollToFirstHit(counter);

  return false;
}


function scrollToFirstHit(counter) {

  if (highlightcounter==0) {
    $('#main').fadeIn()
  }
  // mobile search notification
  if (highlightcounter > 0) {

    var prev = (counter-1)
    var next = (counter+1)

    if (prev < 1 ) prev = highlightcounter
    if (next > highlightcounter ) next = 1
  } 

  /* scroll to first found occurence */
  i = 1;

  $('.highlight').each(function() {

    if (i==counter)
    {
      scrollToObject = false;
      if (!$(this).is(':visible')) {
        if ($(this).parent().is(':selected')) {
          scrollToObject = $(this).parents();
        }
      } else {
        scrollToObject = $(this);
      }
      //i++;
      if (scrollToObject) {
        /* Scroll speed is based on absolute distance. And previous started scroll animation are stopped in their track */
        scrollDistance = ($(window).scrollTop() - (scrollToObject.offset().top - $('.top-header').height() - 15));
        if (scrollDistance < 0) scrollDistance = scrollDistance * -1;
        /* Don't use variable speed on distances exceeding 2000 pixels */
        scrollSpeed = scrollDistance < 2000 ? scrollDistance : 2000;
        $('html,body').stop( true, true ).animate(
          {scrollTop: scrollToObject.offset().top - $('.top-header').height() - 15},scrollSpeed);
        return false;
      }

    }
    i++

  });

  return false;
}
jQuery(function($) {
var headerTop = $('.top-header').offset().top;
 
var stickytopHeaderTop = function(){
var scrollTop = $(window).scrollTop();
      
if (scrollTop > headerTop) { 
    $('.top-header').addClass('sticky');
} else {
    $('.top-header').removeClass('sticky'); 
}
};
 
stickytopHeaderTop();
 
$(window).scroll(function() {
  stickytopHeaderTop();
});
});