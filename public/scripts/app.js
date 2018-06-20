/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetObject) {
    const fullName = tweetObject["user"]["name"];
    const profilePicture = tweetObject["user"]["avatars"]["large"];
    const handle = tweetObject["user"]["handle"];
    const tweetContent = tweetObject["content"]["text"];
    const postTime = tweetObject["created_at"];

    return `
    <article class="tweet">
        <header>
          <img src="${profilePicture}" alt="" class="profile-picture">
          <h3 class="full-name">${fullName}</h3>
          <span class="username">${handle}</span>
        </header>

        <p class="tweet-content">${tweetContent}</p>
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

function renderTweets(arrayOfTweetObjects) {
    arrayOfTweetObjects.forEach(entry => {
        $("#tweets-container").prepend(createTweetElement(entry));
    });
}

function fetchTweets() {
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

$(document).ready(function() {
    // render all the tweets first.
    fetchTweets();

    // listen for form submit
    $("form").on("submit", function(event) {
        event.preventDefault();
        let tweetContent = $(event.target).serialize();
        $.ajax({
            url: "/tweets",
            type: "POST",
            data: tweetContent
        }).then(function() {
            //render all the tweets again
            fetchTweets();
        });
    });
});
