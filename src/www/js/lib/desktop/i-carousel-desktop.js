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
			this.slides = u.qsa('li.item', this);
			this.current_slide_num = 0;
			this.current_node = this.slides[0];
			this.next_node;
			
			this._previous = u.qs('ul.actions li.next', this);
			this._next = u.qs('ul.actions li.previous', this);
			//list._indexes = u.ae(list.container, "ul", {"class": "indexes"});

			var i, node;
			for(i = 0; node = this.slides[i]; i++) {
				u.bug("node: " + node.innerHTML)
				// list._index = u.ae(list._indexes, "li", {"class": "index", "html": i+1})
				// list._index._id = i;
				// u.e.click(list._index);
				// list._index.clicked = function(event) {
				// 	u.bug("go to: " + this._id);
				// 	list.hide(list.current_node);
				// 	list.show(list.slides[this._id]);
				// }

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


			// this.current_node.transitioned = function() {
			// 	u.a.transition(this, "none");
			// 	//u.a.translate(this, -200, 0);
			
			// 	// show NEW
			// 	u.a.transition(node, "all 500ms ease-in-out");
			// 	u.a.setOpacity(node, 1);

			// 	// set current node
			// 	list.current_node = node;
			// }

			// // Bg
			// u.a.transition(this.current_node, "all 500ms ease-in-out");
			// u.a.setOpacity(this.current_node, 0);
			
		}

    	
		// callback to list ready
		list.ready();

	}
}