$('.nanodegree').mouseover(function() {
  $('.nanodegree img').addClass('reveal');
  $('.nanodegree figcaption').removeClass('hidden');
})
$('.nanodegree').mouseleave(function() {
  $('.nanodegree img').removeClass('reveal');
  $('.nanodegree figcaption').addClass('hidden');
})
$('.certificate').mouseover(function() {
  $(this).children('p').removeClass('hidden');
  $(this).children('img').css('width', '50%');
  $(this).children('img').css('margin', '0px auto');
  $(this).parents('.boxes').addClass('box_small_bottom');
})
$('.certificate').mouseleave(function() {
  $(this).children('img').css('width', '100%');
  $(this).children('img').css('margin', '10px auto');
  $(this).children('p').addClass('hidden');
  $(this).parents('.boxes').removeClass('box_small_bottom');
})
