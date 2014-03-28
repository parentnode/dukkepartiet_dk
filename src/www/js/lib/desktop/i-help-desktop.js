Util.Objects["help"] = new function() {
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
			
			u.bug("help   " + u.browserHeight());

			// scene height
			u.as(this, "height", u.browserHeight()+"px");

			// margin of item
			this.ul = u.qs(".container", this);
			u.as(this.ul, "paddingTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");
			

			// loaded!
			page.ready();
			page.cN.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}