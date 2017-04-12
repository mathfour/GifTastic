
// We need to start with some colors, so how about these
var colorList = ["white", "silver", "pink"];

// We need these arrays to switch from still to animated and back
// I'm defining them globally so they can be accessed all over
var srcIMGAnim = [];
var srcIMGStill = [];


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

        }); // end of $.each(array, function (x, thisColor)
    }; // end of function makeButtons(array)

    // This renders the buttons on the initial load
    makeButtons(colorList);



    // Action that happens when user enters a new color in the form
    $("#colorForm").submit(function (event) {
        event.preventDefault();

        // Using a singleton array so I can use the array function makeButtons
        var colorInputted = [];
        colorInputted.push($("#colorInput").val().trim());

        // launching the array function so we can make colorInputted into a button
        makeButtons(colorInputted);

        // This clears the input blank so it's not annoying
        $("#colorInput").val("");
    }); // end of $("#colorForm").submit(function (event)







    // This launches the ajax request on the giphy api when a color button is clicked
    $("#colorButtons").on("click", ".searchColor", function () {

        // colorNow is the current color we'll search and get gifs for
        var colorNow = this.id;

        // These arrays are declared globally. This empties them to start fresh,
        // just in case they are holding some junk from another place
        srcIMGAnim = [];
        srcIMGStill = [];

        // we'll pull images with this rating and only this many images
        var rating = "pg";
        var limit = 10;

        // this is the search url for the color button that gets clicked
        var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + colorNow + "&rating=" + rating + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        // Getting out the dish soap for the good stuff to happen...
        $.ajax({
            url: searchURL,
            method: "GET"
        }).done(function(whatImGettingBack){

            // this clears out the div for the images
            $("#colorImages").text("");

            // we just need the data part of the JSON call
            colorImgArray = whatImGettingBack.data;

            // we have 10 bits of data, so now it's time to pluck out the parts we need
            $.each(colorImgArray, function (i) {

                // Getting the bits I'll need to display rating and still image
                // This will be the part that gets loaded automatically
                rating = whatImGettingBack.data[i].rating;
                var thisImg = whatImGettingBack.data[i].images.original_still.url;

                // Populating these arrays for the logic below to do still vs. animated
                // The first is the still and the second one is the animated one
                srcIMGStill.push(thisImg);
                srcIMGAnim.push(whatImGettingBack.data[i].images.original.url);


                // Creating a container for the ratings and images so things will
                // float left nicely and not nut-up all over the page
                var containerForAll = $("<div>");
                $(containerForAll).attr("class", "imgContainer");

                // html goodies just for the rating part
                var htmlForRating = $("<figcaption>");
                $(htmlForRating).append("Rating: " + rating);

                // html goodies for the (still) image itself
                var htmlForImage = $("<img>");
                $(htmlForImage).attr({
                    id: "image" + i,
                    src: thisImg
                });

                // Putting the rating and the image in the container
                $(containerForAll).append(htmlForRating);
                $(containerForAll).append(htmlForImage);

                // And now putting all the goodies from the container on the page
                $("#colorImages").append(containerForAll);

            }); // end of $.each(colorImgArray, function (i)




            // the click event that switches from still to animated and back again
            $("img").on("click", function () {

                // Going to compare the url of the clicked image with those in the arrays
                // of the still urls and the animated urls. So first name the url:
                var srcOfClickedImage = $(this).attr("src");

                // Declaring these out here so we can use them after the "each" logic
                var switchToAnim = -1;
                var switchToStill = -1;

                // Compare each recorded url to see its current status (still or anim).
                // Note since both arrays are the same length, we just need to "each" on
                // one of the arrays.
                $.each(srcIMGStill, function (i) {

                    if (srcOfClickedImage === srcIMGStill[i]){
                        switchToAnim = i;
                    };

                    if (srcOfClickedImage === srcIMGAnim[i]){
                        switchToStill = i;
                    };

                    // notice there's no else, here. I'm comparing 20 things to the
                    // one url to find both the image and the state that was clicked

                }); // end of $.each(srcIMGStill, function (i)

                // If the switchToAnim has an index number (not -1), that's the
                // index number of the image that needs to switch to animated
                if (switchToAnim != -1) {
                    $(this).attr("src", srcIMGAnim[switchToAnim]);
                };

                // If the switchToStill has an index number (not -1), that's the
                // index number of the image that needs to switch to still
                if (switchToStill != -1){
                    $(this).attr("src", srcIMGStill[switchToStill]);
                };

            }); // end of $("img").on("click", function ()

        }); // end of .done(function(whatImGettingBack)

    }); // end of $("#colorButtons").on("click", ".searchColor", function ()

}); // end of $(document).ready(function ()