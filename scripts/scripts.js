$(function(){
  $("#content-table-link").on("click", function(e){
    e.preventDefault();
    $("#content-table").slideToggle();
  });

  dp.SyntaxHighlighter.BloggerMode();
  dp.SyntaxHighlighter.HighlightAll('code');
})