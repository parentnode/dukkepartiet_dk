Util.Objects["events"] = new function() {
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

			this.nodes = u.qsa("ul.items li.item", this);
			var i, node;
			for(i = 0; node = this.nodes[i]; i++) {
				u.ce(node, {"type":"link"});
			}

			page.scrolled();
		}

		// callback to scene ready
		scene.ready();
	}
}