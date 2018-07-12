Util.Objects["video"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this));
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			page.scenes.push(this);

			this.ul = u.qs("ul.items", this)
			if(this.ul) {
				this.nodes = u.qsa("ul.items li.item", this.ul);

				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {

					node._image_available = u.cv(node, "image_id");

					// if image
					if(node._image_available) {

						// src
						node._image_format = u.cv(node, "image_format");
						node._image_src = "/images/" + node._image_available + "/main/300x." + node._image_format;

						// add image
						node._image_mask = u.ie(node, "div", {"class":"image"});
						node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
					
						node.player_url = u.qs("a", node).href;

					
						// REGEX! example urls
						// http://www.youtube.com/watch?v=zSWUWPx2VeQ
					
						if(node.player_url.match(/youtube/i)) {

							var p_id = node.player_url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
							if(p_id) {
								node.player_id = p_id[1];

								// add play button
								node._bn_play = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
								node._bn_play.node = node;

								u.ce(node._bn_play);
								node._bn_play.clicked = function(event) {

									page.youtubeVideo(this.node.player_id);

								}
							}
						}

					}
				}
			}

			page.scrolled();
		}

		// callback to scene ready
		scene.ready();

	}
}