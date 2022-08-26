$(function(){
  var selectedClass = "";
  $(".filter").click(function(){
      selectedClass = $(this).attr("data-rel"); 
      $(".work").fadeTo(100, 0.1);
      $(".portfolio-item").not("."+selectedClass).fadeOut().removeClass('scale');
      setTimeout(function(){
          $("."+selectedClass).fadeIn().addClass('scale').sort();
          $(".work").fadeTo(300, 1);
      }, 300); 
  });
});