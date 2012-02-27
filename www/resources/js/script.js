// Menu accessibility: keyboard navigation for ≤ IE8 //
/*@cc_on@if(@_jscript_version<9)
for(var lis=document.getElementById("menu").getElementsByTagName("li"),i=0;i<lis.length;i++){lis[i].getElementsByTagName("a")[0].id="time"+(i+1);if(lis[i].getElementsByTagName("div").length>0){for(var anchors=lis[i].getElementsByTagName("div")[0].getElementsByTagName("a"),j=0;j<anchors.length;j++){var a=anchors[j],t="time";a.setAttribute("begin",t+(i+1)+".focus");a.setAttribute("end",t+(i+2)+".focus;"+t+i+".focus");a.setAttribute(t+"Action","class:afocus");a.addBehavior("#default#time2")}}};
@end@*/

(function($) {
	$(function(){

		beautifyTweet = function(tweet) {
			parseURL = function(tweet) {
				return tweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(url) {
					return url.link(url);
				});
			};

			parseUsername = function(tweet) {
				return tweet.replace(/[@]+[A-Za-z0-9-_]+/, function(u) {
					return u.link("http://twitter.com/"+u.replace("@",""));
				});
			};

			parseHashtag = function(tweet) {
				return tweet.replace(/[#]+[A-Za-z0-9-_]+/, function(t) {
					return t.link("http://search.twitter.com/search?q="+t.replace("#","%23"));
				});
			};

			tweet= parseURL(tweet);
			tweet= parseUsername(tweet);
			tweet= parseHashtag(tweet);

			return tweet;
		};

		var format_date_ago = function (timestamp)
		{
			var diff = Math.floor((new Date()).getTime() / 1000) - timestamp;

			if (diff == 0)
			{
				return 'just now';
			}

			var unit = 'year', divide = 31556926;
			if (diff < 31556926) { unit = 'month', divide = 2628000; }
			if (diff < 2629744) { unit = 'week', divide = 604800; }
			if (diff < 604800) { unit = 'day', divide = 86400; }
			if (diff < 86400) { unit = 'hour', divide = 3600; }
			if (diff < 3600) { unit = 'minute', divide = 60; }
			if (diff < 60) { unit = 'second', divide = 1; }

			var value = Math.floor(diff / divide);

			return value + ' ' + unit + (value > 1 ? 's' : '') + ' ago';
		};

		$.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?count=1&include_rts=t&screen_name=axrproject&callback=?",
				function(tweet){
					var time = format_date_ago(Math.floor((new Date(tweet[0].created_at)).getTime() / 1000));
					$(".last_tweet > .tweet_container").html(beautifyTweet(tweet[0].text) + ' &mdash; ' + time);
				}
		);


		$("#container > header > nav > ul > li").hover(function(){
		    $(this).closest('li').addClass('hover').find(".sections").removeClass('hidden');
		}, function(){
		    $(this).closest('li').removeClass('hover').find(".sections").addClass('hidden');
		});


		$("#container > #intro > ul.social > li > a").click(function(event) {
			event.preventDefault();
			var page = $(this).attr("href");
			var popUpHeight = 245;
			var popUpWidth = 730;
			var top = ($(window).height() - popUpHeight) / 2;
			var left = ($(window).width() - popUpWidth) / 2;
			var options= "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=" + popUpWidth + ", height=" + popUpHeight + ", top= " + top + ", left=" + left;
			window.open(page,"",options);
		});

		$("#container > footer > a").click(function(event){
			event.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 800);
		});
	});

	$('#container > header > .secondary > .search > input[type=text]').bind('focus', function(e){
		if($(this).val() == 'Search'){
			$(this).val('');
		}
	}).bind('blur', function(e){
		if($(this).val() == ''){
			$(this).val('Search');
		}
	});

	(function(){
		var $modal = $('.modal').hide().removeClass('hidden');
		$modal.bind('show',function(){
			$(this).fadeIn('slow');
		});
		$modal.bind('hide',function(){
			$(this).fadeOut('fast');
		});
		$modal.find('.modal_close').click(function(){
			$(this).closest('.modal').trigger('hide');
			return false;
		});
		$modal.click(function(e){
			if(e.target != this)
				return;
			$(this).trigger('hide');
		});
		$('#action_button').click(function(){
			$('#joining').trigger('show');
			return false;
		});
	})();
})(jQuery);
