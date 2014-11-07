$(function(){
  //$("#content-sidebar h4").on("click", function(e){
    //e.preventDefault();
    //$(this).next(".topic ul").toggle();
    //});

  dp.SyntaxHighlighter.BloggerMode();
  dp.SyntaxHighlighter.HighlightAll('code');
})

$(function(){
  $('.js-menu-trigger').on('click touchstart', function(e){
    $('.js-menu').toggleClass('is-visible');
    $('.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  $('.js-menu-screen').on('click touchstart', function(e){
    $('.js-menu').toggleClass('is-visible');
    $('.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
