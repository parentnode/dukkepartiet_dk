Util.Objects["support"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
			var height = u.browserHeight()-160; // 160px is padding
			if (scene.ul.offsetHeight < height ) {
				// set height
				u.as(scene, "height", height+"px");
			}
			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")

		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			// scene height
			this.ul = u.qs(".container", this);

			// set resize handler
			u.e.addEvent(window, "resize", scene.resized);			
			
			// resize after load
			this.resized();


			// loaded!
			page.ready();
			page.cN.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}