Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
		// resize scene
		scene.resized = function() {
//			u.bug("scene.resized:" + u.nodeId(this));
			// slogan height
			u.as(scene, "height", u.browserHeight()+"px");
			var height = u.browserHeight() - scene.logo.offsetHeight - 100; // 100px bottom
			u.as(scene.slogan, "marginTop", (height/2)-(scene.slogan.offsetHeight/2) +"px");

			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")
			var scroll_y = u.scrollY();
			var browser_h = u.browserH();
			if (scroll_y > browser_h) {
				if (u.hc(page.hN, "no_logo")) {
					u.rc(page.hN, "no_logo");
				}
			} else {
				if (!u.hc(page.hN, "no_logo")) {
					u.ac(page.hN, "no_logo");
					u.bug("add logo");
				}
			}
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			// after loading all scenes
			//u.bug("booom: " + u.qsa(".scene", page.cN).length)
			if (u.qsa(".scene", page.cN).length == 3) {
				
				// add logo
				this.logo = u.ie(this, "div", {"class": "logo"});

				// slogan container
				this.slogan = u.qs(".container", this);
				
				// duplicate servicenavigation to intro section
				// this.servicenavigation = u.qs("ul.servicenavigation", page.fN);
				// u.ae(this, this.servicenavigation)

				// load slogan
				this.loadSloganImages();
				
				// set resize handler
				u.e.addEvent(window, "resize", scene.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", scene.scrolled);

				// resize / scroll straight away!
				this.resized();
				this.scrolled();


				// after all scenes loaded
				page.ready();
			}
			
		}

		scene.loadSloganImages = function() {

			//this.slogan = u.qs(".container", this);
			
			
			
			this.slogans = u.qsa("ul.items li.item", this.slogan);

			var i, node;
			for (i = 0; node = this.slogans[i]; i++) {
				//u.bug("slogan image node:  " + node);

				node._image_available = u.cv(node, "image_id");
				//u.bug("_image_available:  " + node._image_available);

				// if image
				if(node._image_available) {
					// src
					//node._image_src = "/logo/940/" + node._image_available + "." + node._image_format;
					node._image_src = "/images/" + node._image_available + "/960x.png";

					// add image
					node._image_mask = u.ie(node, "div", {"class":"image"});
					node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
				}
			}
		}

		scene.loadPages = function() {
								

			this.sections = ["/aktioner", "/doktriner"];
			//var sections = ["/aktioner", "/events", "/doktriner", "/tweets", "/about"];
			
			// request new content
			var i, section, div;
			for (i = 0; section = this.sections[i]; i++) {
				//this.scene_divs[section] =  u.ae(this, "div");
				
				div = u.ae(page.cN, "div");

				// content received
				div.response = function(response) {
					//u.bug("navigate response:" + this.request_url + ", " + response.body_class)

					// get .scene content from response
					var new_scene = u.qs(".scene", response);

					// append new scene to #content
					//scene = u.ae(this, this.scene);
					this.innerHTML = new_scene.innerHTML;
					u.ac(this, new_scene.className);
					//u.ac(scene, "scene");

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
