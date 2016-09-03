
jQuery(function($) {

  var $terms=[];
  var $count=0;
  var $i= 0;
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
          $count=totalCounter;
          $('a#btn-next').attr('href','javascript:;');
          $('a#btn-prev').attr('href','javascript:;');
          return true;
    }
};
    options["className"] ="search-found";
    
    $context.mark(searchTerm, options);

  });
  //$button.trigger("click.perform");

  $('a#btn-next').on('click',function(){ 
    
   if($i<0){
    $i = 0;
   }
    if($i <= parseInt($count)){
      $('mark').eq($i).attr('id', 'term-'+$i);
      $('mark').eq($i).css({"background":"yellow"});
      $i++;
    } 
    console.log($i);
  });
    $('a#btn-prev').on('click',function(){
    
     if ($i > parseInt($count)){
      $i = $count;
     }
      if($i>=0){ 
           $('mark').eq($i).attr('id', 'term-'+$i);
          $('mark').eq($i).css({"background":"orange"});
          $i--;
      }
        console.log($i);
  });
});