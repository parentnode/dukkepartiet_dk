Util.Objects["carousel"] = new function() {
	this.init = function(list) {

		// resize list
		list.resized = function() {
//			u.bug("list.resized:" + u.nodeId(this));

			// refresh dom
			//this.offsetHeight;
		}

		// check fold on scroll
		list.scrolled = function() {
//			u.bug("scrolled")
		}


		list.ready = function() {
//			u.bug("list.ready:" + u.nodeId(this));
			
			//u.bug("doctrines");
			this.container = u.we(this, "div", {"class": "container"})
			this.slides = u.qsa('li.item', this);
			this.current_slide_num = 0;
			this.current_node = this.slides[0];
			this.next_node;
			
			this._previous = u.ae(this.container, "div", {"class": "next", "html": "Næste"});
			this._next = u.ae(this.container, "div", {"class": "previous", "html": "Forrige"});

			var i, node;
			for(i = 0; node = this.slides[i]; i++) {
				

				// // CLICK
				u.e.click(this._next);
				u.e.click(this._previous);
				this._next.clicked = this._previous.clicked = function(event) {

					if (u.hc(event.target, "next")) {
						if (list.current_slide_num == list.slides.length-1) {
							list.current_slide_num = 0;	
						} else {
							list.current_slide_num++;
						}
						list.hide(list.current_node);
						list.show(list.slides[list.current_slide_num]);
					}

					if (u.hc(event.target, "previous")) {
						if (list.current_slide_num != 0) {
							list.current_slide_num--;
						} else {
							list.current_slide_num = list.slides.length-1;
						}
						list.hide(list.current_node);
						list.show(list.slides[list.current_slide_num]);
					}
				}

				if (i == 0) {
					u.as(node, "display", "block");
				} else {
					u.as(node, "display", "none");
				}
			}
			
			//page.cN.ready();
		}
		
		list.hide = function(node) {
			//u.a.setOpacity(node, 0);
			u.as(node, "display", "none");
		}

		list.show = function(node) {
			// show
			u.as(node, "display", "block");
			// remember current node
			list.current_node = node;
		}

    	
		// callback to list ready
		list.ready();

	}
}