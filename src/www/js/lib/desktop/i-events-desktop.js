Util.Objects["events"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

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
			
			this.nodes = u.qsa("ul.items li.item", this);
			var i, node;
			for (i = 0; node = this.nodes[i]; i++) {
				u.ce(node);
				node.clicked = function() {
					location.href = this.url;
				}
			}

			// loaded!
			page.ready();
			page.cN.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}