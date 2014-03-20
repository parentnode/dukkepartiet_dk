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

			// init slogans
			this.initSlogans();

			this.loadPages();
			page.cN.ready();
		}

		scene.initSlogans = function() {
			
		}
		scene.loadPages = function() {
								
			// content received
			this.response = function(response) {
				//u.bug("navigate response:" + this.request_url + ", " + response.body_class)

				// get .scene content from response
				this.scene = u.qs(".scene", response);

				// append new scene to #content
				this.scene = u.ae(page.cN, this.scene);

				// init content - will callback to ready when done
				u.init(this);
			}

			var sections = ["/doktriner"];
			//var sections = ["/aktioner", "/events", "/doktriner", "/tweets", "/about"];
			
			// request new content
			var i;
			for (i = 0; section = sections[i]; i++) {
				u.request(this, u.h.getCleanHash(section));
			}
		}

		scene.ready();

	}
}
