Util.Modules["vision"] = new function() {
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

			page.scrolled();
		}

		// callback to scene ready
		scene.ready();
	}
}