jQuery(function($) {
  var $context = $("main");
  var $form = $(".searchTermForm");
  var $button = $form.find("button[name='perform']");
  var $input = $form.find("input[name='keyword']");
  $button.on("click.perform", function() {
    var searchTerm = $input.val();
    var options = {};
    var values = $form.serializeArray();
    options["className"] ="search-found";
    $context.unmark();
//     var options = {
//     "filter": function(node, term, totalCounter, counter){
//         if( counter >= 1){
//             return false;
//         } else {
//             return true;
//         }
//     }
// };
    $context.mark(searchTerm, options);

  });
  $button.trigger("click.perform");

});