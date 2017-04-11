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
                class: "searchColor",
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


    // <button id="purple" value="purple" class="searchColor" style="background-color:
    // purple;">purple</button>




    $(".searchColor").click(function () {
        var colorNow = this.id;
        // console.log(colorNow);
        var rating = "pg";
        var limit = 10;

        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + colorNow + "&rating=" + rating + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        $.ajax({
            url: searchURL,
            method: "GET"
        }).done(function(whatImGettingBack){
            $("#colorImages").text("");
            colorImgArray = whatImGettingBack.data;

            $.each(colorImgArray, function (i) {
                rating = whatImGettingBack.data[i].rating;
                srcIMG = whatImGettingBack.data[i].images.fixed_width_still.url;

                var htmlForImage = $("<img>");

                $(htmlForImage).attr("src", srcIMG);

                $("#colorImages").append(htmlForImage);
            });
        });
    });











    // These don't work, but I'm keeping them here for instructional purposes
    // They will be helpful as I look back on this code.

    // $("#colorImages").on("click", ".searchColor", function () {
    //     console.log("this is the .on 'click' event")
    // });

    // $("#colorImages").click(function () {
    //     console.log("this is the click event");
    // });

    // $(".searchColor #red").click(function () {
    //     console.log("this is the click event with searchColor red");
    // });

    // $("#red .searchColor").click(function () {
    //     console.log("this is the click event with searchColor red");
    // });


    // This works but I don't need it
    // Keeping it, again, for instructional purposes later.
    // $("#blue").click(function () {
    //     console.log("this is the click event with blue");
    // });



});