$(document).ready(function() {
	
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
		$(".tweet-container").empty();
    for (obj of tweets) {
			const $tweetElement = createTweetElement(obj);
			$(".tweet-container").prepend($tweetElement);
		}
	};

	const createTweetElement = function(tweet) {
		let $tweet = `
  <article>
  <header class= "tweet-header">
    <div>
      <img src="${escape(tweet.user.avatars)}">
      <span>${escape(tweet.user.name)}</span>
    </div>
    <div>
      <span>${escape(tweet.user.handle)}</span>
    </div>
  </header>
  <body>
      <span>${escape(tweet.content.text)}</span>
  </body>
  <footer class= "tweet-footer">
    <span>${timeago.format(tweet.created_at)}</span>
    <div class="actions">
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