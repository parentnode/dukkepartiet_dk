Util.Modules["interview"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:", this);
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.scenes.push(this);

			this.ul = u.qs("ul.items", this)
			if(this.ul) {
				this.nodes = u.qsa("ul.items li.item", this.ul);

				var i, node;
				for(i = 0; node = this.nodes[i]; i++) {

					node._image = u.qs(".image", node);
					node._image_id = u.cv(node._image, "image_id");
					node.loaded = function(queue) {
						u.ae(this._image, "img", {"src":queue[0].image.src});
					}
					u.preloader(node, ["http://img.youtube.com/vi/"+node._image_id+"/0.jpg"])

					node.player_id = u.qs("a", node).innerHTML;

					// add play button
					node._bn_play = u.ae(node._image, "div", {"class":"play_bn", "html": "<p>Play</p>"});
					u.ce(node);
					node.clicked = function(event) {

						page.youtubeVideo(this.player_id);

					}
				}
			}

			page.scrolled();
		}

		// callback to scene ready
		scene.ready();

	}
}