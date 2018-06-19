/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const mockTweet = {
    user: {
        name: "Newton",
        avatars: {
            small:
                "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            regular:
                "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            large:
                "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        handle: "@SirIsaac"
    },
    content: {
        text:
            "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
};

function createTweetElement(tweetObject) {
    const fullName = tweetObject["user"]["name"];
    const profilePicture = tweetObject["user"]["avatars"]["large"];
    const handle = tweetObject["user"]["handle"];
    const tweetContent = tweetObject["content"]["text"];
    const postTime = tweetObject["created_at"];

    return `<article class="tweet">
        <header>
          <img src="${profilePicture}" alt="" class="profile-picture">
          <h3 class="full-name">${fullName}</h3>
          <span class="username">${handle}</span>
        </header>

        <p class="tweet-content">${tweetContent}</p>
        <hr>
        <footer>

          <span class="post-time">${new Date(postTime).toLocaleDateString(
              "en-US"
          )}</span>
          <div class="tweet-interact">
            <span class="fas fa-retweet fa-2x"></span>
            <span class="fas fa-heart fa-2x"></span>
            <span class="fas fa-flag fa-2x"></span>
          </div>

        </footer>
      </article>`;
}

$(document).ready(function() {
    $("#tweets-container").append(createTweetElement(mockTweet));
});
