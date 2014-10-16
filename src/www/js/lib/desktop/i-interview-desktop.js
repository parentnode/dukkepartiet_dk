Util.Objects["interview"] = new function() {
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
			
			//u.bug("statsminister");
			
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

					// CLICK
					u.ce(node);
					// click play - inject iframe
					node.clicked = function(event) {
						//u.bug("this.player_html:  " + this.player_html)
						
						u.as(scene.video_container, "display", "block");
						// u.as(scene.video_container, "top", u.absY(this)-100 +"px");
						var top = u.scrollY()+( u.browserHeight()/2 ) - (this.player_height/2);
						
						u.as(scene.video_container, "top", top+"px");
						scene.video_player.innerHTML = this.player_html;

						var h3 = this._h3.cloneNode(true);
						var p = this._p.cloneNode(true);
						u.ae(scene.video_player, h3);
						u.ae(scene.video_player, p);
						
						u.as(scene.ul, "opacity", "0.5");

					}
				}
			}
			
			// callback to init menu etc.
			page.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}