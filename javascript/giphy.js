console.log("this is working");


var colorList = ["red", "white", "blue"];


$(document).ready(function () {

    // This creates a button for every color in the color list

    function makeButtons(array) {

        $.each(array, function (x, thisColor) {

            var colorButton = $("<button>");

            // This makes the background color of the buttons to be the same as the color!
            var buttonBGColor = 'background-color: ' + thisColor + ';';


            colorButton.attr({
                id: thisColor,
                value: thisColor,
                style: buttonBGColor
            });

            colorButton.append(thisColor);

            $("#colorButtons").append(colorButton);

        });
    }

    $("#colorForm").submit(function (event) {
        event.preventDefault();

        var colorInputted = [];
        colorInputted.push($("#colorInput").val());



        console.log(colorInputted);

        makeButtons(colorInputted);
    });

    makeButtons(colorList);
});