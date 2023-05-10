$(document).ready(function() {
	/*const data = [
		{
			"user": {
				"name": "Newton",
				"avatars": "https://i.imgur.com/73hZDYK.png",
				"handle": "@SirIsaac"
			},
			"content": {
				"text": "If I have seen further it is by standing on the shoulders of giants"
			},
			"created_at": 1461116232227
		},
		{
			"user": {
				"name": "Descartes",
				"avatars": "https://i.imgur.com/nlhLi3I.png",
				"handle": "@rd"
			},
			"content": {
				"text": "Je pense , donc je suis"
			},
			"created_at": 1461113959088
		}
	];*/

	const renderTweets = function(tweets) {
		// loops through tweets
		// calls createTweetElement for each tweet
		// takes return value and appends it to the tweets container
		//console.log("renderTweets")
		for (obj of tweets) {
			const $tweetElement = createTweetElement(obj);
			$(".tweet-container").prepend($tweetElement);
		}
	};


	const createTweetElement = function(tweet) {
		let $tweet = `
  <article class = "tweet">
  <header>
    <div>
      <img src="${tweet.user.avatars}">
       &nbsp&nbsp${tweet.user.name}
    </div>
    <div>
      <a>${tweet.user.handle}</a>
    </div>
  </header>
  <body>
    <p class="user-post">${tweet.content.text}</p>
  </body>
  <footer>
    <div>${timeago.format(tweet.created_at)}</div>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

		return $tweet;
	};

	$("#tweetForm").submit(function(event) {
		event.preventDefault();
		const tweetContent = $("#tweet-text").val();
		const serialized = $(this).serialize();
		//console.log("logout", tweetContent)
		$.ajax({
			url: "/tweets",
			data: serialized,
			type: "POST"
		}).then(function(response) {
		//console.log(tweetContent)
		});
	});
  
  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      renderTweets(data)
    })
  }
  
  loadTweets();
  //renderTweets(data);
});