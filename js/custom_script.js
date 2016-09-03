function clearHighlights() {
  $('main').removeHighlight();
  // $('.productsearchstringnotification,.restaurantsearchstringnotification').fadeOut();
  highlightcounter = 0;
}

var searchterm = false;
var oldsearchterm = false;
var counter = 1;
function searchPrompt(searchterm) {

  /* Make sure that we are on the menucard tab */
  if (window.modrewriteprefix == undefined) {
    window.modrewriteprefix = '/';
  }

  var categoryitem = $(this);
  console.log(searchterm);
  /* if the infotabs are present AND we're not on the menucard tab already, do that first */
  if ($('.restaurantinfotab_selected').length && $('.restaurantinfotab_selected a').attr('id').substr(8).toLowerCase() != 'menucard') {
    /* force MenuCard tab */
    clickedTab = $('#infotab_MenuCard').parent();
    clickedTabName = 'MenuCard';
    /* load the contents of the MenuCard tab and update browser state when ready */
    $('.tab_'+clickedTabName.toLowerCase()).load(window.modrewriteprefix+'show'+ucfirst(clickedTabName)+'.php', function() {
      /* push new browser state using History.js methods */
      History.pushState({clickedTabName:clickedTabName,category:categoryitem.attr('id')}, clickedTab.attr('title'), clickedTab.children('a').first().attr('href'));
      searchPrompt(searchterm); // start the search
    });
  }
  else
  {
    if (oldsearchterm != searchterm)  {
      counter = 1;
      oldsearchterm = searchterm;

      clearHighlights();
      $('main').highlight(searchterm);
      $('main').highlight(searchterm);

      showSearchNotification(counter,highlightcounter)
      //$('.searchPanel .productsearchstringnotification').fadeIn().html(counter + ' / ' + highlightcounter)
    }
    else
    {
      counter++;
      if (counter > highlightcounter) counter = 1;
      showSearchNotification(counter,highlightcounter)
      //$('.searchPanel .productsearchstringnotification').fadeIn().html(counter + ' / ' + highlightcounter)
    }

    scrollToFirstHit(counter);
  }

  return false;
}
function showSearchNotification(counter,highlightcounter) {
  if (highlightcounter==0) {
    $('.searchPanel .productsearchstringcounter').hide()
    $('.productsearchstringnotification, .restaurantsearchstringnotification').fadeIn()
    return false;
  }
  $('.searchPanel .productsearchstringcounter').fadeIn().html(counter + ' / ' + highlightcounter)
}


function scrollToFirstHit(counter) {

  if (highlightcounter==0) {
    $('.productsearchstringnotification, .restaurantsearchstringnotification').fadeIn()
  }
  // mobile search notification
  if (highlightcounter > 0) {

    var prev = (counter-1)
    var next = (counter+1)

    if (prev < 1 ) prev = highlightcounter
    if (next > highlightcounter ) next = 1


    $('.searchtop-headerigation .controls').fadeIn();

    var click = '<a href="#" onclick="scrollToFirstHit('+prev+'); return false;"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-backward fa-stack-1x fa-inverse"></i></span></a>';
    click += '<span class="counter">'+counter + ' / ' + highlightcounter+'</span>';
    click += '<a href="#" onclick="scrollToFirstHit('+next+'); return false;"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-forward fa-stack-1x fa-inverse"></i></span></a>'

    //var clicktag = "<a href=\"#\" onclick=\"scrollToFirstHit(); return false;\"><i class=\"fa fa-backward\"></i> <span class=\"counter\"></span> <i class=\"fa fa-forward\"></i></a>";
    $('.searchtop-headerigation .controls').fadeIn().html(click)
  } else {
    $('.searchtop-headerigation .controls').fadeOut();
  }

  /* scroll to first found occurence */
  i = 1;

  $('.highlight').each(function() {

    if (i==counter)
    {
      scrollToObject = false;
      if (!$(this).is(':visible')) {
        if ($(this).parent().is(':selected')) {
          scrollToObject = $(this).parents('select');
        }
      } else {
        scrollToObject = $(this);
      }
      //i++;

      if (scrollToObject) {
        /* Scroll speed is based on absolute distance. And previous started scroll animation are stopped in their track */
        scrollDistance = ($(window).scrollTop() - (scrollToObject.offset().top - $('.top-header').height() - 125));
        if (scrollDistance < 0) scrollDistance = scrollDistance * -1;
        /* Don't use variable speed on distances exceeding 2000 pixels */
        scrollSpeed = scrollDistance < 2000 ? scrollDistance : 2000;
        $('html,body').stop( true, true ).animate(
          {scrollTop: scrollToObject.offset().top - $('.top-header').height() - 125},
          scrollSpeed
        );

        return false;
      }

    }
    i++

  });

  return false;
}

jQuery(document).ready(function($) {
  /* make sure both search fields have the same content */
  $('.step3 #iproductsearchstring, #irestaurantsearchstring').keyup(function(e) {
    $('.step3 #iproductsearchstring2, #irestaurantsearchstring2').val($(this).val());
    /* if empty, clear all highlights */
    if ($(this).val() == '') {
      clearHighlights();
      $('.searchtop-headerigation .controls').fadeOut();
    }
  });

  $('.step3 #iproductsearchstring2, #irestaurantsearchstring2').keyup(function(e) {
    $('.step3 #iproductsearchstring, #irestaurantsearchstring').val($(this).val());
    /* if empty, clear all highlights */
    if ($(this).val() == '') {
      clearHighlights();
      $('.searchtop-headerigation .controls').fadeOut();
    }
  });

});

jQuery(function($){
  var $form = $(".searchTermForm");
  var $button = $form.find("button[name='perform']");
  var $input = $form.find("input[name='keyword']");
  $button.on("click", function() {

      $('main').highlight($input.val());
  });
  
});
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