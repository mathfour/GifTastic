console.log("this is working");


var colorList = ["red", "white", "blue"];





$(document).ready(function() {

  // var thisColor = colorList[0];
  $.each(colorList, function(x, thisColor){

    var colorButton = $("<button>");

    colorButton.attr({
      id: thisColor,
      value: thisColor
    });
    colorButton.append(thisColor);

    $("#colorButtons").append(colorButton);

  });



});