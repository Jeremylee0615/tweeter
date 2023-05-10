$(document).ready(function () {
  $("textarea").on("input", function () {
    const maxText = 140
    const typedText = $(this).val()
    const remainingText = maxText - typedText.length
    
    const $counter = $(".counter")
    $counter.text(remainingText) 
    if (remainingText < 0) {
      $counter.css("color", "Red")
    } else {
      $counter.css("color", "#F4F1EC")
    }
  })
})