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
		<div class="container">
		  <div class="panel panel-default">
		    <div class="panel-heading">
		      <form class="row searchTermForm" >
		        <div class="col-xs-12">
		          <div class="form-group">
		            <label for="keyword">Search term:</label>
		            <input type="text" class="form-control input-sm" placeholder="Type your term" value="" name="keyword" id="keyword">
		          </div>
		        <button type="button" class="btn btn-default btn-sm" name="perform">Perform</button>
		        <button type="button" class="btn btn-default btn-sm" name="next">Next</button>
		        <button type="button" class="btn btn-default btn-sm" name="prev">Previous</button>
		        </div>

		      </form>
		    </div>
		  </div>
		</div>
		<script type="text/javascript" src=""></script>
		<?php
	}
	function xs__enqueue_scripts(){
		wp_enqueue_script( 'mark-js-script','https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.0.1/jquery.mark.es6.js', array('jquery'), '1.8', true );
		wp_enqueue_script( 'mark-js-script-custom', plugins_url().'/highlightsearch/js/custom_script.js', array('mark-js-script'), '1.0', true);
	}
	add_action('wp_enqueue_scripts','xs__enqueue_scripts');
	add_shortcode( 'search_term', 'xss__highlight_form' );
?>