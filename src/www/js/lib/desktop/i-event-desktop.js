Util.Objects["event"] = new function() {
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
			
			u.bug("event!   " + u.browserHeight());

			// scene height
			u.as(this, "height", u.browserHeight()+"px");

			// margin of item
			this.ul = u.qs("ul.items li.item", this);
			u.as(this.ul, "marginTop", (u.browserHeight()/2)-(this.ul.offsetHeight/2) +"px");
			

			// loaded!
			page.ready();
			page.cN.ready();
		}

		// callback to scene ready
		scene.ready();

	}
}