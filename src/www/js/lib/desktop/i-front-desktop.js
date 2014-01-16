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

			// get html list
			//this.list = u.qs(".news", this);

			// make ajax call to fetch more pages / content nodes

			// enable ajax navigation
			//u.navigation(page);

			scene.initNavigation();


			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}

		scene.initNavigation = function() {
			//scene.navigate(node.url, page.nN);
			scene.navigate("/aktivistiske", page.cN);
			scene.navigate("/kandidater", page.nN);
			scene.navigate("/manifest", page.nN);
			scene.navigate("/folkets_stemme", page.nN);
			scene.navigate("/debatten", page.nN);
			scene.navigate("/om_os", page.nN);
			scene.navigate("/kontakt", page.nN);
		}


		// Content loader
		scene.navigate = function(url) {
//				u.bug("navigation on content level")

			// content received
			this.response = function(response) {
//					u.bug("navigate response:" + this.request_url + ", " + response.body_class)

				// set body class
				u.setClass(document.body, response.body_class);
				// set title
				document.title = response.head_title;

				// get .scene content from response
				this.scene = u.qs(".scene", response);

				// move new scene out of sight
				//u.a.translate(this.scene, this.offsetWidth, 0);
				// append new scene to #content
				this.scene = u.ae(this, this.scene);

				// init content - will callback to ready when done
				u.init(this);

			}
			// request new content
			u.request(this, u.h.getCleanHash(url));
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
