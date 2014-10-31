$(function(){
  $("#content-sidebar h4").on("click", function(e){
    e.preventDefault();
    $(this).next(".topic ul").toggle();
  });

  dp.SyntaxHighlighter.BloggerMode();
  dp.SyntaxHighlighter.HighlightAll('code');
})