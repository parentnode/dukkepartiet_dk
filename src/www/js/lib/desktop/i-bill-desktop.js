Util.Objects["scene"] = new function() {
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
			
			u.bug("standard scene");
			
			// callback to init menu etc.
			page.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}