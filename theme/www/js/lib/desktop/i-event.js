Util.Objects["event"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:", this);

			// adjust height of event view
			u.as(this, "height", page.browser_h+"px");
			u.as(this.ul, "paddingTop", (page.browser_h-(this.ul.offsetHeight-parseInt(u.gcs(this.ul, "padding-top"))))/2 +"px");

		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scene.scrolled:", this);
		}

		scene.ready = function() {
//			u.bug("scene.ready:", this);

			page.scenes.push(this);
			this.ul = u.qs("ul.items", this);

			page.resized();
			page.scrolled();
		}

		// callback to scene ready
		scene.ready();

	}
}