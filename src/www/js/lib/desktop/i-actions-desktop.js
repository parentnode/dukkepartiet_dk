Util.Objects["actions"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
			//u.bug("scene.resized:" + u.nodeId(this));

			


			// var value = browserWidth;
			// value *= 1;
			// var valueHeight = Math.round((value/16)*9);

			//var height = (u.browserWidth()/16)*9;
			u.bug("width: " + u.browserWidth());
			u.bug("height: " + (u.browserWidth()/16)*9)
			u.as(scene.current_node, "height", (u.browserWidth()/16)*9 + "px", true);

			// $('#vidHeight').text(valueHeight);
			// $('#videoBox').css('width',value + 'px').css('height',valueHeight +'px');
			// $('#videoPlayer').css('width',value + 'px');



			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")

		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			u.bug("events");
			
			scene.container = u.qs(".events", scene);
			scene.slide = u.qs('ul.slides', scene.container);
			scene.slides = u.qsa('li.slide', scene.slide);
			scene.current_slide_num = 0;
			scene.current_node = scene.slides[0];
			scene.next_node;
			
			scene._previous = u.qs('ul.actions li.next', scene);
			scene._next = u.qs('ul.actions li.previous', scene);

			//scene._indexes = u.ae(scene.container, "ul", {"class": "indexes"});

			var i, node;
			for(i = 0; node = scene.slides[i]; i++) {

				// CLICK
				u.e.click(scene._next);
				u.e.click(scene._previous);
				scene._next.clicked = scene._previous.clicked = function(event) {
					u.bug("click");
					if (u.hc(event.target, "next")) {
						if (scene.current_slide_num == scene.slides.length-1) {
							scene.current_slide_num = 0;	
						} else {
							scene.current_slide_num++;
						}
					}

					if (u.hc(event.target, "previous")) {
						if (scene.current_slide_num != 0) {
							scene.current_slide_num--;
						} else {
							scene.current_slide_num = scene.slides.length-1;
						}
					}
					// update slide
					scene.show(scene.slides[scene.current_slide_num]);
					
				}

				if (i == 0) {
					u.a.setOpacity(node, 1);
				} else {
					u.a.setOpacity(node, 0);
				}
			}
			
			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();

			this.resized();
			u.e.addEvent(window, "resize", this.resized);
		}

		
		// scene.hide = function(node) {
		// 	u.bug("hide node: " + node);
		// 	u.a.setOpacity(node, 0);
		// }

		scene.show = function(node) {
			u.bug("show node: " + node);

			this.current_node.transitioned = function() {
				u.a.transition(this, "none");
				//u.a.translate(this, -200, 0);
			
				// show NEW
				u.a.transition(node, "all 500ms ease-in-out");
				u.a.setOpacity(node, 1);

				// set current node
				scene.current_node = node;
			}

			// Bg
			u.a.transition(this.current_node, "all 500ms ease-in-out");
			u.a.setOpacity(this.current_node, 0);
			//u.a.translate(node, 200, 0);
		}





		// YOTUBE API
		var youtubeArr = ["JtH68PJIQLE", "mMXPk0znusU", "UK-lGSYKaaM", "31AFfyPXUKQ", "Gd_vcEHlKSk", "1J9l3O1jmrg"];
		var num = 1;
		
		// This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var player1;
		// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
		window.onYouTubePlayerAPIReady = function() {
			//u.bug("onYouTubePlayerAPIReady");

			player1 = new YT.Player('player1', {
				playerVars: {
					'autoplay': 0,
					'controls': 0,
					'autohide':1,
					'showinfo': 0,
					'loop': 1,
					'rel': 0,
					'wmode': 'transparent',
					'enablejsapi': 1,
					'html5': 1, // some ads in youtube dosen't work in the html5 version.
					//'is_html5_mobile_device': 1,
					'modestbranding': 1
				},
				videoId: youtubeArr[0],
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange,
					'onError': onPlayerError
				}
			});
		}
		

		// 4. The API will call this function when the video player is ready.
		var onPlayerReady = function (event) {
			u.bug("onPlayerReady");

			//event.target.playVideo();
			//event.target.setPlaybackQuality('hd720');

			//player1.loadVideoById(youtubeArr[q], 0, "hd720");			
			//event.target.mute();
			//event.target.unMute();
			//event.target.playVideo();
			//event.target.pauseVideo();
			
		}

		var onPlayerStateChange = function(event) {
			
			// Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
			var statement = event.target.getPlayerState();
			
			switch (statement) {
				case -1:
					u.bug("player state: Unstarted " + event.target.getPlayerState());
					// event.target.playVideo();
					// event.target.setPlaybackQuality('hd720');

					break;
				case 0:
					u.bug("player state: ended " + event.target.getPlayerState());
					// Load next video?
					playNextVideo(player1, youtubeArr);
					break;
				case 1:
					u.bug("player state: playing " + event.target.getPlayerState());
					// Hide buffer UI
					//hideBufferGraphics();

					break;
				case 2:
					u.bug("player state: paused " + event.target.getPlayerState());
					break;
				case 3:
					u.bug("player state: buffering " + event.target.getPlayerState());
					// SHOW UI
					break;
				case 5:
					u.bug("player state: video cued " + event.target.getPlayerState());
					break;
			}
		}

		var onPlayerError = function(event) {
			u.bug("onPlayerError: " + event.data);
			
			if (event.data == 5) {
				// https://groups.google.com/forum/#!topic/youtube-api-gdata/K0-MZzbRRQc
				u.bug("error code 5: incompatible HTML5 video. Probably the fucking ad.")
			}
			/*
			2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
			5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
			100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
			101 – The owner of the requested video does not allow it to be played in embedded players.
			150 – This error is the same as 101. It's just a 101 error in disguise!
			*/
		}

		var playNextVideo = function(player, arr) {

			u.bug(num + "    : " + arr[num]);
			player.loadVideoById(arr[num], 0, "hd720");
			player.playVideo();

			num++;
			if (num == arr.length) {num = 0;}
		}

    	
		// callback to scene ready
		//scene.ready();

	}
}