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
		        <button type="submit" class="btn btn-default btn-sm" name="perform">Perform</button>
		     <!--    <a id="btn-next" class="btn btn-default btn-sm" name="next">Next</a>
		        <a id="btn-prev" class="btn btn-default btn-sm" name="prev">Previous</a> -->
		        </div>

		      </form>
		    </div>
		  </div>
		</div>
		<?php
	}
	function xs__enqueue_scripts(){
		//wp_enqueue_script( 'mark-js-script','https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.0.1/jquery.mark.es6.js', array('jquery'), '1.8', true );
		wp_enqueue_script( 'highlight-js',plugins_url().'/highlightsearch/js/highlight.js', array('jquery'), '1.8', true );
		wp_enqueue_script( 'highlight-custom', plugins_url().'/highlightsearch/js/custom_script.js', array('highlight-js'), '1.0', true);
		wp_enqueue_style("custom-plugin-style", plugins_url( ).'/highlightsearch/css/style.css' );
	}
	add_action('wp_enqueue_scripts','xs__enqueue_scripts');
	add_shortcode( 'search_term', 'xss__highlight_form' );
?>