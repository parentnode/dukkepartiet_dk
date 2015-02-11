Util.Objects["scene"] = new function() {
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

			page.scrolled();
		}

		// callback to scene ready
		scene.ready();

	}
}