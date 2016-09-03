
jQuery(function($) {

  var $terms=[];
  var $count=0;
  var $i=0;
  var $context = $("main");
  var $form = $(".searchTermForm");
  var $button = $form.find("button[name='perform']");
  var $input = $form.find("input[name='keyword']");
  $button.on("click.perform", function() {
    var searchTerm = $input.val();
    var options = {};
    var values = $form.serializeArray();
   
    $context.unmark();

    var options = {
    "filter": function(node, term, totalCounter, counter){
          $('a#btn-next').attr('href','javascript:;');
          $('a#btn-prev').attr('href','javascript:;');
          $('mark:first').css({"background":"yellow"});
          return true;
      
    }
};
    options["className"] ="search-found";
    
    $context.mark(searchTerm, options);

  });
  //$button.trigger("click.perform");

  $('a#btn-next').on('click',$i=1,function(){
    if($i == 1){

    }
      $('mark').eq($i).attr('id', 'term-'+$i);
      $('mark').eq($i).css({"background":"yellow"});
      console.log($i);
      $i++;
      
  });

});