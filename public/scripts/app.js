/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// this function creates the tweet and returns a string of html
function createTweetElement(tweetObject) {
    const fullName = tweetObject["user"]["name"];
    const profilePicture = tweetObject["user"]["avatars"]["large"];
    const handle = tweetObject["user"]["handle"];
    const tweetContent = tweetObject["content"]["text"];
    const postTime = tweetObject["created_at"];

    // this function escapes all insecure text
    function escape(str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    return `
    <article class="tweet">
        <header>
          <img src="${escape(profilePicture)}" alt="" class="profile-picture">
          <h3 class="full-name">${escape(fullName)}</h3>
          <span class="username">${escape(handle)}</span>
        </header>

        <p class="tweet-content">${escape(tweetContent)}</p>
        <hr>
        <footer>

          <span class="post-time">${moment(postTime).fromNow()}</span>
          <div class="tweet-interact">
            <span class="fas fa-retweet fa-2x"></span>
            <span class="fas fa-heart fa-2x"></span>
            <span class="fas fa-flag fa-2x"></span>
          </div>

        </footer>
        </article>`;
}
// this function loops through the database renders a tweet for each entry
function renderTweets(arrayOfTweetObjects) {
    arrayOfTweetObjects.forEach(entry => {
        $("#tweets-container").prepend(createTweetElement(entry));
    });
}
// this function is an ajax request to load all the tweets
function loadTweets() {
    $.ajax({
        url: "/tweets",
        type: "GET"
    }).then(function(data) {
        // clears all the tweets
        $("#tweets-container").empty();
        // re renders them
        renderTweets(data);
    });
}
// this function uses jQuery to display a flash message for errors
function errorFlashMessage(message) {
    const errorMessage = document.querySelector(".error-flash-message");
    errorMessage.innerHTML = message;

    $(".error-flash-message").fadeIn("normal", function() {
        $(this)
            .delay(800)
            .fadeOut("slow");
    });
}

// this function checks if the tweet is valid
function validateTweet(textArea) {
    if (!textArea) {
        errorFlashMessage("Sorry, we didn't detect a tweet");
        return false;
    }
    if (textArea.length > 140) {
        errorFlashMessage("Sorry, your tweet was over 140 characters long");
        return false;
    }
    return true;
}

$(document).ready(function() {
    // render all the tweets first.
    loadTweets();

    // listen for compose button
    $(".compose-tweet-button").on("click", function(event) {
        $(".container .new-tweet").slideToggle("normal", function() {
            $(this)
                .find("textarea")
                .focus();
        });
    });

    // listen for form submit
    $("form").on("submit", function(event) {
        event.preventDefault();
        let tweetContent = $(event.target).serialize();
        let textAreaContent = $(event.target)
            .children("textarea")
            .val();
        // only posts tweet when it is a valid tweet
        if (validateTweet(textAreaContent)) {
            $.ajax({
                url: "/tweets",
                type: "POST",
                data: tweetContent
            }).then(function() {
                //render all the tweets again
                loadTweets();
            });
        }
    });
});
