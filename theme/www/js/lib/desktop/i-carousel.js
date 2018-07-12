Util.Objects["carousel"] = new function() {
	this.init = function(list) {


		list.hide = function(node) {
			u.as(node, "display", "none");
		}

		list.show = function(node) {
			// show

			u.as(node, "display", node.default_display);
			// remember current node
			this.current_node = node;
		}


		list.container = u.we(list, "div", {"class": "container"})
		list.slides = u.qsa('li.item', list);
		list.current_slide_num = 0;
		list.current_node = list.slides[0];
		list.next_node;

		if(list.slides.length > 1) {

			// add prev/next buttons
			list._previous = u.ae(list.container, "div", {"class": "next", "html": "Næste"});
			list._previous.list = list;

			list._next = u.ae(list.container, "div", {"class": "previous", "html": "Forrige"});
			list._next.list = list;

			var i, node;
			for(i = 0; node = list.slides[i]; i++) {

				node.default_display = u.gcs(node, "display");

				// // CLICK
				u.e.click(list._next);
				u.e.click(list._previous);
				list._next.clicked = list._previous.clicked = function(event) {

					// next was clicked
					if(u.hc(event.target, "next")) {
						if(this.list.current_slide_num == this.list.slides.length-1) {
							this.list.current_slide_num = 0;	
						}
						else {
							this.list.current_slide_num++;
						}
						this.list.hide(this.list.current_node);
						this.list.show(this.list.slides[this.list.current_slide_num]);
					}
					// previous was clicked
					else if(u.hc(event.target, "previous")) {
						if(this.list.current_slide_num != 0) {
							this.list.current_slide_num--;
						} 
						else {
							this.list.current_slide_num = this.list.slides.length-1;
						}
						this.list.hide(this.list.current_node);
						this.list.show(this.list.slides[this.list.current_slide_num]);
					}
				}

				// only show first element to begin with
				if(i != 0) {
					u.as(node, "display", "none");
				}
			}
		}
		

	}
}