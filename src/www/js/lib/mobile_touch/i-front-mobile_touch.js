Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));

			var height = u.browserWidth()/64*181 - 2;
			u.as(scene, "height", height+"px")
			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			// after loading all scenes
			//u.bug("booom: " + u.qsa(".scene", page.cN).length)
			if (u.qsa(".scene", page.cN).length == 2) {
				
				// add logo
				//this.logo = u.ie(this, "div", {"class": "logo"});

				// slogan container
				this.slogan = u.qs(".container", this);
				this.slogan.innerHTML = "";
				// var height = u.browserWidth()/64*149 -2;
				// u.as(this, "height", height+"px")
				
				// set resize handler
				u.e.addEvent(window, "resize", this.resized);

				// resize straight away!
				this.resized();


				// after all scenes loaded
				page.ready();
			}
			
		}


		scene.loadPages = function() {
								

			this.sections = ["/program"];
			
			// request new content
			var i, section, div;
			for (i = 0; section = this.sections[i]; i++) {
				
				div = u.ae(page.cN, "div");

				// content received
				div.response = function(response) {
					//u.bug("navigate response:" + this.request_url + ", " + response.body_class)

					// get .scene content from response
					var new_scene = u.qs(".scene", response);

					// make div the new .scene
					this.innerHTML = new_scene.innerHTML;
					u.ac(this, new_scene.className);

					// init content - will callback to ready when done
					u.init(this);

					// ready callback
					scene.ready();
				}
				u.request(div, u.h.getCleanHash(section));
			}
		}

		scene.loadPages();

	}
}
