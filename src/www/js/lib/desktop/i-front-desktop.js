Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
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

			// add logo
			u.ie(this, "div", {"class": "logo"});
			
			// duplicate servicenavigation to intro section
			this.servicenavigation = u.qs("ul.servicenavigation", page.fN);
			u.ae(this, this.servicenavigation)


			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}

// 		scene.build = function() {
// //			u.bug("scene.build:" + u.nodeId(this));

// 			// show scene, before building process really starts
// 			// u.a.transition(this, "none");
// 			// u.a.setOpacity(this, 1);

// 		}

// 		// destroy scene - decompose to transition
// 		scene.destroy = function() {
// //			u.bug("scene.destroy:" + u.nodeId(this))

// 			// destruction is a one time, oneway street
// 			this.destroy = null;

// 			// Remove this and Init new
// 			this.parentNode.removeChild(this);
// 			page.cN.ready();
// 		}

		// callback to scene ready
		scene.ready();

	}
}
