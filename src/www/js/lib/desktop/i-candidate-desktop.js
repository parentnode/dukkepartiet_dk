Util.Objects["candidate"] = new function() {
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
			
			u.bug("candidate");
			this.li = u.qs("ul.items li.item", this);

			// not enough content to fill screen?
			u.bug("height:  " + this.li.offsetHeight)
			u.bug("u.browserHeight():  " + u.browserHeight())
			
			

			this.li._image_available = u.cv(this.li, "image_id");
			// if image
			if(this.li._image_available) {
				// src
				this.li._image_src = "/images/" + this.li._image_available + "/300x.jpg";
				//alert(this.li._image_src)

				// add image
				this.li._image_mask = u.ie(this.li, "div", {"class":"image"});
				
				this.li.loaded = function(queue) {
					this._image = u.ae(this._image_mask, "img", {"src":this._image_src});

					if (u.browserHeight() > this.offsetHeight) {
						u.bug("CHECK  HEIGHT!!!    " + this.offsetHeight)
						// scene height
						u.as(scene, "height", u.browserHeight()+"px");

						// margin of item
						u.as(this, "marginTop", (u.browserHeight()/2)-(this.offsetHeight/2) +"px");
					} else {
						u.as(this, "padding", "100px 0 60px");
					}
				}
				u.preloader(this.li, [this.li._image_src]);

			}


			

		}

		// callback to scene ready
		scene.ready();

	}
}