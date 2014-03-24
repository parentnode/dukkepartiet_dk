Util.Objects["action"] = new function() {
	this.init = function(scene) {

		// resize scene
		scene.resized = function() {
			
			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		scene.scrolled = function() {
//			u.bug("scrolled")
		}


		scene.ready = function() {
//			u.bug("scene.ready:" + u.nodeId(this));
			
			u.bug("action");
			
			page.cN.ready();

			this.nodes = u.qsa("ul.items li.item", this);

			var i, node;
			for (i = 0; node = this.nodes[i]; i++) {
				
				// u.ce(node);
				// node.clicked = function() {
				// 	location.href = this.url;
				// }

				node._image_available = u.cv(node, "image_id");

				// if image
				if(node._image_available) {
					// src
					//node._image_src = "/logo/940/" + node._image_available + "." + node._image_format;
					node._image_src = "/images/" + node._image_available + "/300x.jpg";

					// add image
					node._image_mask = u.ie(node, "div", {"class":"image"});
					node._image = u.ae(node._image_mask, "img", {"src":node._image_src});
					node._play_bn = u.ae(node._image_mask, "div", {"class":"play_bn", "html": "<p>Play</p>"});
				}
			}
			//this.resized();
			//u.e.addEvent(window, "resize", this.resized);
		}

    	
		// callback to scene ready
		scene.ready();

	}
}