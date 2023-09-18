Util.Modules["support"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:", this);

			if(this.offsetHeight < page.browser_h) {
				// set height
				u.as(this, "height", (page.browser_h-160)+"px");
			}

		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.scenes.push(this);


			page.resized();
			page.scrolled();
		}

		// callback to scene ready
		scene.ready();
	}
}