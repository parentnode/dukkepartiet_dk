Util.Objects["front"] = new function() {
	this.init = function(scene) {
//		u.bug("scene init:" + u.nodeId(scene))
		
		// resize scene
		scene.resized = function() {
			u.bug("scene.resized:" + u.nodeId(this));

			// front height
			u.as(this, "height", page.browser_h+"px", false);

			u.as(this._h1, "paddingTop", (page.browser_h/2)+"px", false);
		}

		// check fold on scroll
		scene.scrolled = function() {
			u.bug("scene.scrolled:" + u.nodeId(this));

//			u.bug("scroll_y: " + scroll_y);
			// hide logo
			if(page.scroll_y > page.browser_h) {
				if(u.hc(page, "no_logo")) {
					u.rc(page, "no_logo");
				}
			}
			// show logo
			else {
				if(!u.hc(page, "no_logo")) {
					u.ac(page, "no_logo");
				}
			}

			// hide menu
			if(page.scroll_y+100 > page.browser_h) {
				if(u.hc(page, "no_menu")) {
					u.rc(page, "no_menu");
				}
			}
			// show menu
			else {
				if(!u.hc(page, "no_menu")) {
					u.ac(page, "no_menu");
				}
			}

			// position logo
			if(this.logo) {
				if(page.scroll_y > page.browser_h-400) {

					if(u.hc(this.logo, "fixed")) {
						u.rc(this.logo, "fixed");
						u.as(this.logo, "top", page.browser_h-400 +"px");
					}
				}
				//
				else {
					if(!u.hc(this.logo, "fixed")) {
						u.ac(this.logo, "fixed");
						u.as(this.logo, "top", "0px")
					}
				}
			}
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));


			// after loading all scenes
			if(u.qsa(".scene", page.cN).length == this.sections.length+1) {

				page.scenes.push(this);

				// add logo
				this.logo = u.ie(this, "div", {"class": "logo"});

				// slogan container
//				this.slogan = u.qs(".container", this);

				this._h1 = u.qs("h1", this);

				// duplicate servicenavigation to intro section
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				this.servicenavigation.removeChild(u.qs(".support_us", this.servicenavigation));
				u.ae(this, this.servicenavigation)

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
		// 			node._image_src = "/images/" + node._image_available + "/main/1600x" + "." + node._image_format;
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


		// load additional frontpage scenes
		scene.loadPages = function() {

			this.sections = ["/videoer", "/aktioner"];
//			this.sections = ["/aktioner", "/program"];
			//var sections = ["/aktioner", "/events", "/doktriner", "/tweets", "/about"];

			// request new content
			var i, section, div;
			for (i = 0; section = this.sections[i]; i++) {

				div = u.ae(page.cN, "div");
				div.scene = this;

				// content received
				div.response = function(response) {
					//u.bug("navigate response:" + this.request_url + ", " + response.body_class)

					// get .scene content from response
					var new_scene = u.qs(".scene", response);
					if(new_scene) {
						// append new scene to #content
						this.innerHTML = new_scene.innerHTML;
						u.ac(this, new_scene.className);

						u.init(this);

						// local ready callback (waiting for all sections to be loaded)
						this.scene.ready();
					}

				}
				u.request(div, u.h.getCleanHash(section));
			}
		}

		// start loading frontpage sections
		scene.loadPages();
	}
}
