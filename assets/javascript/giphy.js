// initialize the .js document
$(document).ready(function() {
    // list topic variables in an object 
    var topics = {
        subjects: [{
            item: 'Music',
        }, {
            item: 'TV',
        }, {
            item: 'Movies',
        }, {
            item: 'Cartoons',
        }, {
            item: 'Phones',
        }, {
            item: 'Horror',
        }, {
            item: 'Hair Metal',
        }, {
            item: 'Video Games',
        }, {
            item: 'Hair',
        }, {
            item: 'Toys',
        }]
    };

    // 
    function buildTopics() {

        // 
        $('#searchTopic').empty();

        // for loop to iterate 10x
        for (var i = 0; i < topics.subjects.length; i++) {
            // create buttons with class named "topicButtons"
            var button = $('<button>').addClass('topicsButtons');
            // add text to button from object array 'subjects'
            button.text(topics.subjects[i].item);
            // add attribute 'data-topic' to button
            button.attr("data-topic", "80s " + topics.subjects[i].item);
            // add button to 'searchTopic' id
            $('#searchTopic').append(button);
        }
    }
    // call the function
    buildTopics();

    // on-click event for 'add-button-form'
    $('.add-button-form').on("click", function() {
        // create var for input entered into search field
        var inputButton = $('#new-topic').val().trim();
        // if search term is empty, return false
        if (inputButton === "") {
            // 
            return false;
            // if 
        } else {
            // if search term has a value, 
            $('#new-topic').val("");
            // push the value to the subjects array
            topics.subjects.push({ item: inputButton });
            // run the function
            buildTopics();
            // stops the function
            return false;
        }

    });

    // to display the gifs for a dynamically generated button (created from search term)
    $(document).on('click', '.topicsButtons', function() {
        // assigns property to the search term "topic"
        var item = $(this).data('topic');
        // 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=dc6zaTOxFJmzC&limit=10";
        // 

        var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=80s&api_key=UybPaKQB0Ak9FzMWbZnAgjlqCyp0s0Ls&limit=10");
        xhr.done(function(data) {
             console.log("success got data", data); });
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            // 
            .done(function(response) {

                // 
                var results = response.data;
                // 
                $('.images-row').empty();
                // 
                for (var i = 0; i < results.length; i++) {

                    // 
                    var topicsDiv = $('<div>').addClass('col-md-4 gif-container');
                    // 
                    var p = $('<p>');
                    // 
                    var topicsImage = $('<img>').addClass('gif');
                    // 
                    topicsImage.attr('src', results[i].images.fixed_height_still.url);
                    // 
                    topicsImage.attr('data-animate', results[i].images.fixed_height.url);
                    // 
                    topicsImage.attr('data-still', results[i].images.fixed_height_still.url);
                    // 
                    topicsImage.attr('data-state', 'still');
                    // 
                    var rating = results[i].rating;
                    // 
                    p = p.html("Rating: " + rating);
                    //  
                    topicsDiv.append(topicsImage);
                    // 
                    topicsDiv.append(p);
                    // 
                    $('#gifsHere').append(topicsDiv);
                }
            });

    });
    // 
    $(document).on('click', '.gif', function() {
        // 
        var state = $(this).attr('data-state');
        // 
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
            // 
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });


});