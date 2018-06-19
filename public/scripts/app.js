/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
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
    },
    {
        user: {
            name: "Descartes",
            avatars: {
                small:
                    "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                regular:
                    "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                large:
                    "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            handle: "@rd"
        },
        content: {
            text: "Je pense , donc je suis"
        },
        created_at: 1461113959088
    },
    {
        user: {
            name: "Johann von Goethe",
            avatars: {
                small:
                    "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                regular:
                    "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                large:
                    "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            handle: "@johann49"
        },
        content: {
            text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        created_at: 1461113796368
    }
];
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

// new Date(postTime).toLocaleDateString(
//     "en-US"
// )

function renderTweets(arrayOfTweetObjects) {
    arrayOfTweetObjects.forEach(entry => {
        $("#tweets-container").append(createTweetElement(entry));
    });
}

$(document).ready(function() {
    renderTweets(data);
});
