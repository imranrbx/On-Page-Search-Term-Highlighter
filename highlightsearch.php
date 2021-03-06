<?php 
	/*
	Plugin Name: Highlight Search Term
	Author: itsmeleo
	AUthor URI: https://fiverr.com/itsmeleo
	Plugin URI: https://www.upwork.com/freelancers/~01250708a239ea0df1
	Description: This is a simple On Page search Plugin, which search any Term on the page and Highlight it.
	version: 1.0
	*/
	function xss__highlight_form(){
		?>
		<div class="top-header">
		  <div class="panel panel-default search ">
		    <div class="panel-heading">
		      <form class="row searchTermForm top" method="post" onsubmit="return searchPrompt(document.getElementById('keyword').value); return false;" >
		        <div class="col-xs-12">
		          <div class="form-group">
		            <label for="keyword">Search term:</label>
		            <input type="text"  class="form-control input-sm" placeholder="Type your term" value="" name="keyword" id="keyword">
		          </div>
		        <input type="submit" class="btn btn-default btn-sm" name="perform" value="Search" />
		        </div>
		      </form>
		    </div>
		    <div class="panel panel-footer"><p class="small">Note: To further your search simply click twice</p></div>
		  </div>
		</div>
		<script type="text/javascript">
			var searchterm = false;
var oldsearchterm = false;
var counter = 1;
var highlightcounter = 0;
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
		</script>
		<?php
	}
	function xs__enqueue_scripts(){
		//wp_enqueue_script( 'mark-js-script','https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.0.1/jquery.mark.es6.js', array('jquery'), '1.8', true );
		wp_deregister_script('jquery' );
		wp_dequeue_script('jquery' );
		wp_enqueue_script('jquery','https://code.jquery.com/jquery-1.12.4.min.js',array(),'1.12.1',true );
		wp_enqueue_script( 'highlight-js',plugins_url().'/highlightsearch/js/highlight.js', array('jquery'), '1.8', true );
		wp_enqueue_style("custom-plugin-style", plugins_url( ).'/highlightsearch/css/style.css' );
	}
	add_action('wp_enqueue_scripts','xs__enqueue_scripts');
	add_shortcode( 'search_term', 'xss__highlight_form' );
?>