Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))

		// resize scene
		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			u.as(this, "height", page.browser_h+"px", false);

			if(this._h1) {
				u.as(this._h1, "paddingTop", (this.logo.offsetHeight + 30)+"px", false);
			}
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")

		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			// after loading all scenes
			if(u.qsa(".scene", page.cN).length == this.sections.length+1) {

				page.scenes.push(this);


				// add logo
				this.logo = u.ie(this, "div", {"class": "logo"});

				this._h1 = u.qs("h1", this);

				// slogan container
//				this.slogan = u.qs(".container", this);
//				this.ul = u.qs("ul.items", this);

				// duplicate servicenavigation to intro section
				// this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				// u.ae(this, this.servicenavigation)

				// load slogan
//				this.loadSloganImages();

				// scroll+resize straight away!
				this.scrolled();
				this.resized();

			}
			
		}


		// load slogan images
		// scene.loadSloganImages = function() {
		//
		// 	this.slogans = u.qsa("ul.items li.item", this.slogan);
		//
		// 	var i, node;
		// 	for(i = 0; node = this.slogans[i]; i++) {
		//
		// 		node._image_available = u.cv(node, "image_id");
		//
		// 		// if image
		// 		if(node._image_available) {
		// 			// format, src
		// 			node._image_format = u.cv(node, "image_format");
		// 			node._image_src = "/images/" + node._image_available + "/main/480x" + "." + node._image_format;
		//
		// 			// add image mask
		// 			node._image_mask = u.ie(node, "div", {"class":"image"});
		//
		// 			node.loaded = function(queue) {
		// 				this._image = u.ae(this._image_mask, "img", {"src":this._image_src});
		// 			}
		// 			u.preloader(node, [node._image_src]);
		//
		// 		}
		//
		// 		node.url = u.qs("a", node);
		//
		// 		// if LINK/URL
		// 		if(node.url) {
		// 			u.ce(node, {"type":"link"});
		// 		}
		//
		// 	}
		//
		// 	// show next/prev
		// 	if(this.slogans.length < 2) {
		//
		// 		var next = u.qs(".next", this.slogan);
		// 		u.as(next, "display", "none");
		//
		// 		var prev = u.qs(".previous", this.slogan);
		// 		u.as(prev, "display", "none");
		// 	}
		// }


		scene.loadPages = function() {

			this.sections = ["/stot_os"];
			
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
					this.className = new_scene.className;

					// switch program class
					if(u.hc(this, "help")) {
						u.tc(this, "red", "blue");
					}

					// init content - will callback to ready when done
					u.init();

					// ready callback
					scene.ready();
				}
				u.request(div, section);
			}
		}

		scene.loadPages();

	}
}
