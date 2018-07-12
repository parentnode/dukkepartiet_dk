Util.Objects["support"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			if(this.offsetHeight < page.browser_h) {
				// set height
				u.as(this, "height", (page.browser_h-160)+"px");
			}

		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scene.scrolled:" + u.nodeId(this));
		}

		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));

			page.scenes.push(this);


			page.resized();
			page.scrolled();
		}

		// callback to scene ready
		scene.ready();
	}
}