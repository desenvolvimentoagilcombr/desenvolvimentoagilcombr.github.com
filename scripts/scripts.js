$(function(){
  $("#content-table-link").on("click", function(e){
    e.preventDefault();
    $("#content-table").slideToggle();
  });
})