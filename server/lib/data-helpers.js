"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
    const tweetsCollection = db.collection("tweets");
    return {
        // Saves a tweet to `db`
        saveTweet: function(newTweet, callback) {
            simulateDelay(() => {
                db.tweets.push(newTweet);
                callback(null, true);
            });
        },

        // Get all tweets in `db`, sorted by newest first
        getTweets: function(callback) {
            simulateDelay(() => {
                const sortNewestFirst = (a, b) => a.created_at - b.created_at;
                // gets all the tweets from mongoDB
                tweetsCollection.find({}).toArray((err, response) => {
                    // sorts all the tweets in mongoDB
                    callback(null, response.sort(sortNewestFirst));
                });
            });
        }
    };
};
