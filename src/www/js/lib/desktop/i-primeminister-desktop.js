Util.Objects["primeminister"] = new function() {
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
			if (this.ul) {
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
				
					node._image_id = u.cv(node, "image_id");
					node._image = u.qs(".image", node);
					node._h3 = u.qs("h3", node);
					node._p = u.qs("p", node);

					
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

					node.player_id = u.qs("a", node).innerHTML;
					//node.player_id = p_id[1];
					node.player_html = '<iframe width="' + node.player_width+ '" height="' + node.player_height + '" src="//www.youtube.com/embed/' + node.player_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'

					// add play button
					node._bn_play = u.ae(node._image, "div", {"class":"play_bn", "html": "<p>Play</p>"});
					node._bn_play.node = node //player_html = node.player_html;

					u.ce(node._bn_play);
					// click play - inject iframe
					node._bn_play.clicked = function(event) {
						//u.bug("this.player_html:  " + this.player_html)
						
						u.as(scene.video_container, "display", "block");
						// u.as(scene.video_container, "top", u.absY(this)-100 +"px");
						var top = u.scrollY()+( u.browserHeight()/2 ) - (this.node.player_height/2);
						
						u.as(scene.video_container, "top", top+"px");
						scene.video_player.innerHTML = this.node.player_html;

						var h3 = this.node._h3.cloneNode(true);
						var p = this.node._p.cloneNode(true);
						u.ae(scene.video_player, h3);
						u.ae(scene.video_player, p);
						
						u.as(scene.ul, "opacity", "0.5");

					}
				}
						

					// if image
				// 	if(node._image_id) {
				// 		// src
				// 		node._image_src = "/img/" + node._image_id + ".jpg";
				// 		//node._image_src = "/images/" + node._image_id + "/300x.jpg";

				// 		// add image
				// 		node._image_mask = u.ie(node, "div", {"class":"image"});
				// 		node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
					
				// 		node.player_url = u.qs("a", node).href;
				// 		// normal size
				// 		if (u.browserWidth() > 959 ) {
				// 			node.player_width = 720;
				// 			node.player_height = (node.player_width/16)*9;
				// 		}
				// 		// below 600px
				// 		else {
				// 			node.player_width = 520;
				// 			node.player_height = (node.player_width/16)*9;
				// 		}

				// 		// REGEX! example urls
				// 		// http://www.youtube.com/watch?v=zSWUWPx2VeQ
					
				// 		if(node.player_url.match(/youtube/i)) {

				// 			var p_id = node.player_url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
				// 			if(p_id) {
				// 				node.player_id = p_id[1];
				// 				node.player_html = '<iframe width="' + node.player_width+ '" height="' + node.player_height + '" src="//www.youtube.com/embed/' + node.player_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'

				// 				// add play button
				// 				node._bn_play = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
				// 				node._bn_play.node = node //player_html = node.player_html;

				// 				u.ce(node._bn_play);
				// 				// click play - inject iframe
				// 				node._bn_play.clicked = function(event) {
				// 					//u.bug("this.player_html:  " + this.player_html)
									
				// 					u.as(scene.video_container, "display", "block");
				// 					// u.as(scene.video_container, "top", u.absY(this)-100 +"px");
				// 					var top = u.scrollY()+( u.browserHeight()/2 ) - (this.node.player_height/2);
									
				// 					u.as(scene.video_container, "top", top+"px");
				// 					scene.video_player.innerHTML = this.node.player_html;

				// 					var h3 = this.node._h3.cloneNode(true);
				// 					var p = this.node._p.cloneNode(true);
				// 					u.ae(scene.video_player, h3);
				// 					u.ae(scene.video_player, p);
									
				// 					u.as(scene.ul, "opacity", "0.5");

				// 				}
				// 			}
				// 		}

				// 	}
				// }
			}
			// if(this.ul) {
			// 	this.nodes = u.qsa("ul.items li.item", this.ul);
			// 	this.video_container = u.qs(".youtube", this);
			// 	this.video_player = u.qs(".youtube .player", this);
			// 	this.video_close = u.qs(".youtube .close", this);

			// 	// close video overlay
			// 	u.ce(this.video_close);
			// 	// click play - inject iframe
			// 	this.video_close.clicked = function(event) {
			// 		u.as(scene.video_container, "display", "none");
			// 		scene.video_player.innerHTML = "";
			// 		u.as(scene.ul, "opacity", "1");
			// 	}


			// 	var i, node;
			// 	for (i = 0; node = this.nodes[i]; i++) {
				
			// 		node._image_available = u.cv(node, "image_id");

			// 		// if image
			// 		if(node._image_available) {
			// 			// src
			// 			//node._image_src = "/logo/940/" + node._image_available + "." + node._image_format;
			// 			node._image_src = "/images/" + node._image_available + "/300x.jpg";

			// 			// add image
			// 			node._image_mask = u.ie(node, "div", {"class":"image"});
			// 			node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
					
			// 			node.player_url = u.qs("a", node).href;
			// 			// normal size
			// 			if (u.browserWidth() > 959 ) {
			// 				node.player_width = 720;
			// 				node.player_height = (node.player_width/16)*9;
			// 			}
			// 			// below 600px
			// 			else {
			// 				node.player_width = 520;
			// 				node.player_height = (node.player_width/16)*9;
			// 			}
					
			// 			// REGEX! example urls
			// 			// http://www.youtube.com/watch?v=zSWUWPx2VeQ
					
			// 			if(node.player_url.match(/youtube/i)) {

			// 				var p_id = node.player_url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
			// 				if(p_id) {
			// 					node.player_id = p_id[1];
			// 					node.player_html = '<iframe width="' + node.player_width+ '" height="' + node.player_height + '" src="//www.youtube.com/embed/' + node.player_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'

			// 					// add play button
			// 					node._bn_play = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
			// 					node._bn_play.player_html = node.player_html;
			// 					u.ce(node._bn_play);
			// 					// click play - inject iframe
			// 					node._bn_play.clicked = function(event) {
			// 						//u.bug("this.player_html:  " + this.player_html)
			// 						u.as(scene.video_container, "display", "block");
			// 						scene.video_player.innerHTML = this.player_html;
			// 						u.as(scene.ul, "opacity", "0.5");

			// 					}
			// 				}
			// 			}

			// 		}

			// 	}
			// }


			//this.initYoutube();
			//this.resized();
			//u.e.addEvent(window, "resize", this.resized);

			// callback to init menu etc.
			page.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}