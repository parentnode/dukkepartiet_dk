Util.Objects["support"] = new function() {
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
			
			// scene height
			var height = u.browserHeight();
			this.ul = u.qs(".container", this);

			// smaller than screen
			if (this.ul.offsetHeight < height ) {
				// set height
				u.as(this, "height", u.browserHeight()+"px");
				// margin of item
				u.as(this.ul, "paddingTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");

			// bigger than screen
			} else {
				// set padding
				u.as(this.ul, "padding", "100px 0 60px 0");
			}


			// loaded!
			page.ready();
			page.cN.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}