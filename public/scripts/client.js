$(document).ready(function() {
	
  const renderTweets = function(tweets) {
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
		if (tweetContent.length === 0) {
      $(".error").text("Opps, you have not entered anyting.")
    } else if (tweetContent.length > 140) {
      $(".error").text("Sorry, You have exceeded the words limit that you can tweet.")
    } else {
      const serialized = $(this).serialize();
		  $.post("http://localhost:8080/tweets", serialized, (reponse) => {
        loadTweets();
      });
      /*$.ajax({
			  url: "/tweets",
			  data: serialized,
			  type: "POST"
		  }).then(function(response) {
		  })*/
    };
	});
  
  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      renderTweets(data)
    })
  }
  
  loadTweets();
  //renderTweets(data);
});