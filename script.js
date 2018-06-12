$('.nanodegree').mouseover(function() {
  $('.nanodegree img').addClass('reveal');
  $('.nanodegree figcaption').removeClass('hidden');
})
$('.nanodegree').mouseleave(function() {
  $('.nanodegree img').removeClass('reveal');
  $('.nanodegree figcaption').addClass('hidden');
})
