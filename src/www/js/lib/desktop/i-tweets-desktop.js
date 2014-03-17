Util.Objects["tweets"] = new function() {
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
			
			u.bug("tweets");
			this.wrapper = u.qs("div.tweets", this);
			this.col1 = u.qs("ul.tweets", this.wrapper);
			u.ac(this.col1, "first");
			this.col2 = u.ae(this.wrapper, "ul", {"class": "tweets"});
			this.col3 = u.ae(this.wrapper, "ul", {"class": "tweets last"});

			this.tweets = u.qsa("li.tweet", this.col1);

			// Loop tweets and put them in corrent column
			var i, node;
			for(i = 0; node = this.tweets[i]; i++) {

				if (i%3 == 0) {
					//u.ae(this.col1, node);
				} else if (i%3 == 1) {
					u.ae(this.col2, node);
				} else if (i%3 == 2) {
					u.ae(this.col3, node);
				}
			}
			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}
    	
		// callback to scene ready
		scene.ready();

	}
}