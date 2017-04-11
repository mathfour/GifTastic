var colorList = ["red", "white", "blue"];
var srcIMGLoop = [];
var srcIMG = [];

$(document).ready(function () {

    // This creates a button for every color in the original color list
    // and also makes each subsequent button
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
    // When user types in a color and clicks submit
    // the color gets put in a singleton array (so we can use
    // the array function above to make the button for it
    $("#colorForm").submit(function (event) {
        event.preventDefault();

        var colorInputted = [];
        colorInputted.push($("#colorInput").val());

        console.log(colorInputted);

        makeButtons(colorInputted);
    });

    // This renders the buttons on the initial load
    makeButtons(colorList);

    // ERICK ERICK ERICK ERICK ERICK HELP HELP HELP HELP HELP
    // This should cause ANY element with class of searchColor to work
    // But it doesn't - so I need help on this one
    $("#colorButtons").on("click", ".searchColor", function () {
    // $(".searchColor").click(function () {
        var colorNow = this.id;
        srcIMGLoop = [];
        srcIMG = [];

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
                // Getting the bits I'll need to display rating and image
                rating = whatImGettingBack.data[i].rating;
                var thisImg = whatImGettingBack.data[i].images.original_still.url;

                // Populating these arrays for the toggle: still vs. animated
                srcIMG.push(whatImGettingBack.data[i].images.original_still.url);
                srcIMGLoop.push(whatImGettingBack.data[i].images.looping.url);

                // Creating a container for the ratings and images
                var containerForAll = $("<div>");
                $(containerForAll).attr("class", "imgContainer");

                // html goodies just for the rating
                var htmlForRating = $("<figcaption>");
                $(htmlForRating).append("Rating: " + rating);

                // html goodies for the image itself
                var htmlForImage = $("<img>");
                $(htmlForImage).attr({
                    id: "image" + i,
                    src: thisImg
                });

                // Putting the rating and the image in the container
                $(containerForAll).append(htmlForRating);
                $(containerForAll).append(htmlForImage);

                $("#colorImages").append(containerForAll);

            });
        });
    });


    // $("img").click(function () {
    //     var actionNow = this.id;
    // };








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