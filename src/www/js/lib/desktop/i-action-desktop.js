Util.Objects["action"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
			
			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			u.bug("action");
			
			page.cN.ready();

			this.ul = u.qs("ul.items", this)
			this.nodes = u.qsa("ul.items li.item", this.ul);
			this.video_container = u.qs(".youtube", this);
			this.video_player = u.qs(".youtube .player", this);
			this.video_close = u.qs(".youtube .close", this);

			// close video overlay
			u.ce(this.video_close);
			// click play - inject iframe
			this.video_close.clicked = function(event) {
				u.as(scene.video_container, "display", "none");
				scene.video_player.innerHTML = "";
				u.as(scene.ul, "opacity", "1");
			}


			var i, node;
			for (i = 0; node = this.nodes[i]; i++) {
				
				node._image_available = u.cv(node, "image_id");

				// if image
				if(node._image_available) {
					// src
					//node._image_src = "/logo/940/" + node._image_available + "." + node._image_format;
					node._image_src = "/images/" + node._image_available + "/300x.jpg";

					// add image
					node._image_mask = u.ie(node, "div", {"class":"image"});
					node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
					
					node.player_url = u.qs("a", node).href;
					// normal size
					if (u.browserWidth() > 959 ) {
						node.player_width = 720;
						node.player_height = (node.player_width/16)*9;
					}
					// below 600px
					else {
						node.player_width = 520;
						node.player_height = (node.player_width/16)*9;
					}
					
					// REGEX! example urls
					// http://www.youtube.com/watch?v=zSWUWPx2VeQ
					
					if(node.player_url.match(/youtube/i)) {

						var p_id = node.player_url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
						if(p_id) {
							node.player_id = p_id[1];
							node.player_html = '<iframe width="' + node.player_width+ '" height="' + node.player_height + '" src="//www.youtube.com/embed/' + node.player_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'

							// add play button
							node._bn_play = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
							node._bn_play.player_html = node.player_html;
							u.ce(node._bn_play);
							// click play - inject iframe
							node._bn_play.clicked = function(event) {
								//u.bug("this.player_html:  " + this.player_html)
								u.as(scene.video_container, "display", "block");
								scene.video_player.innerHTML = this.player_html;
								u.as(scene.ul, "opacity", "0.5");

							}
						}
					}

				}

			}

			//this.initYoutube();
			//this.resized();
			//u.e.addEvent(window, "resize", this.resized);
		}




		// scene.playVideo = function(id) {
		// //var playVideo = function() {

		// 	u.bug("video ID:   " + id);
		// 	player1.loadVideoById(id, 0, "hd720");
		// 	player1.playVideo();

		// 	// num++;
		// 	// if (num == arr.length) {num = 0;}
		// }
		// scene.initYoutube = function() {
		// 	// YOTUBE API
		// 	//var youtubeArr = ["JtH68PJIQLE", "mMXPk0znusU", "UK-lGSYKaaM", "31AFfyPXUKQ", "Gd_vcEHlKSk", "1J9l3O1jmrg"];
		// 	//var num = 1;
			
		// 	// This code loads the IFrame Player API code asynchronously.
		// 	var tag = document.createElement('script');
		// 	tag.src = "https://www.youtube.com/iframe_api";
		// 	var firstScriptTag = document.getElementsByTagName('script')[0];
		// 	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// 	var player1;
		// 	// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
		// 	window.onYouTubePlayerAPIReady = function() {
		// 		//u.bug("onYouTubePlayerAPIReady");

		// 		player1 = new YT.Player('player1', {
		// 			playerVars: {
		// 				'autoplay': 0,
		// 				'controls': 0,
		// 				'autohide':1,
		// 				'showinfo': 0,
		// 				'loop': 1,
		// 				'rel': 0,
		// 				'wmode': 'transparent',
		// 				'enablejsapi': 1,
		// 				'html5': 1, // some ads in youtube dosen't work in the html5 version.
		// 				//'is_html5_mobile_device': 1,
		// 				'modestbranding': 1
		// 			},
		// 			//videoId: youtubeArr[0],
		// 			events: {
		// 				'onReady': onPlayerReady,
		// 				'onStateChange': onPlayerStateChange,
		// 				'onError': onPlayerError
		// 			}
		// 		});
		// 	}
		
		// }
		// // 4. The API will call this function when the video player is ready.
		// var onPlayerReady = function (event) {
		// 	u.bug("onPlayerReady");

		// 	//event.target.playVideo();
		// 	//event.target.setPlaybackQuality('hd720');

		// 	//player1.loadVideoById(youtubeArr[q], 0, "hd720");			
		// 	//event.target.mute();
		// 	//event.target.unMute();
		// 	//event.target.playVideo();
		// 	//event.target.pauseVideo();
			
		// }

		// var onPlayerStateChange = function(event) {
			
		// 	// Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
		// 	var statement = event.target.getPlayerState();
			
		// 	switch (statement) {
		// 		case -1:
		// 			u.bug("player state: Unstarted " + event.target.getPlayerState());
		// 			// event.target.playVideo();
		// 			// event.target.setPlaybackQuality('hd720');

		// 			break;
		// 		case 0:
		// 			u.bug("player state: ended " + event.target.getPlayerState());
		// 			// Load next video?
		// 			// playNextVideo(player1, youtubeArr);

		// 			// close overlay?
		// 			break;
		// 		case 1:
		// 			u.bug("player state: playing " + event.target.getPlayerState());
		// 			// Hide buffer UI
		// 			//hideBufferGraphics();

		// 			break;
		// 		case 2:
		// 			u.bug("player state: paused " + event.target.getPlayerState());
		// 			break;
		// 		case 3:
		// 			u.bug("player state: buffering " + event.target.getPlayerState());
		// 			// SHOW UI
		// 			break;
		// 		case 5:
		// 			u.bug("player state: video cued " + event.target.getPlayerState());
		// 			break;
		// 	}
		// }

		// var onPlayerError = function(event) {
		// 	u.bug("onPlayerError: " + event.data);
			
		// 	if (event.data == 5) {
		// 		// https://groups.google.com/forum/#!topic/youtube-api-gdata/K0-MZzbRRQc
		// 		u.bug("error code 5: incompatible HTML5 video. Probably the fucking ad.")
		// 	}
		// 	/*
		// 	2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
		// 	5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
		// 	100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
		// 	101 – The owner of the requested video does not allow it to be played in embedded players.
		// 	150 – This error is the same as 101. It's just a 101 error in disguise!
		// 	*/
		// }


    	
		// callback to scene ready
		scene.ready();

	}
}