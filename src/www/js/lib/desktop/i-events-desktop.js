Util.Objects["events"] = new function() {
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
			
			u.bug("events");
			
			scene.container = u.qs(".events", scene);
			scene.slide = u.qs('ul.slides', scene.container);
			scene.slides = u.qsa('li.slide', scene.slide);
			scene.current_slide_num = 0;
			scene.current_node = scene.slides[0];
			scene.next_node;
			
			scene._previous = u.qs('ul.actions li.next', scene);
			scene._next = u.qs('ul.actions li.previous', scene);

			//scene._indexes = u.ae(scene.container, "ul", {"class": "indexes"});

			var i, node;
			for(i = 0; node = scene.slides[i]; i++) {

				// CLICK
				u.e.click(scene._next);
				u.e.click(scene._previous);
				scene._next.clicked = scene._previous.clicked = function(event) {
					u.bug("click");
					if (u.hc(event.target, "next")) {
						if (scene.current_slide_num == scene.slides.length-1) {
							scene.current_slide_num = 0;	
						} else {
							scene.current_slide_num++;
						}
						scene.show(scene.slides[scene.current_slide_num]);					
					}

					if (u.hc(event.target, "previous")) {
						if (scene.current_slide_num != 0) {
							scene.current_slide_num--;
						} else {
							scene.current_slide_num = scene.slides.length-1;
						}
						scene.show(scene.slides[scene.current_slide_num]);
					}
					
				}

				if (i == 0) {
					u.a.setOpacity(node, 1);
				} else {
					u.a.setOpacity(node, 0);
				}
			}
			
			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}

		
		// scene.hide = function(node) {
		// 	u.bug("hide node: " + node);
		// 	u.a.setOpacity(node, 0);
		// }

		scene.show = function(node) {
			u.bug("show node: " + node);

			this.current_node.transitioned = function() {
				u.a.transition(this, "none");
				//u.a.translate(this, -200, 0);
			
				// show NEW
				u.a.transition(node, "all 500ms ease-in-out");
				u.a.setOpacity(node, 1);

				// set current node
				scene.current_node = node;
			}

			// Bg
			u.a.transition(this.current_node, "all 500ms ease-in-out");
			u.a.setOpacity(this.current_node, 0);
			//u.a.translate(node, 200, 0);
		}

    	
		// callback to scene ready
		scene.ready();

	}
}