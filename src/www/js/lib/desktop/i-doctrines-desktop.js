Util.Objects["doctrines"] = new function() {
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
			
			u.bug("doktrinen");
			
			scene.container = u.qs(".doktrinen", scene);
			scene.slide = u.qs('ul.slides', scene.container);
			scene.slides = u.qsa('li.slide', scene.slide);
			scene.current_slide_num = 0;
			scene.current_node = scene.slides[0];
			scene.next_node;
			
			scene._previous = u.qs('ul.actions li.next', scene.container);
			scene._next = u.qs('ul.actions li.previous', scene.container);

			scene._indexes = u.ae(scene.container, "ul", {"class": "indexes"});

			var i, node;
			for(i = 0; node = scene.slides[i]; i++) {

				scene._index = u.ae(scene._indexes, "li", {"class": "index", "html": i+1})
				scene._index._id = i;
				u.e.click(scene._index);
				scene._index.clicked = function(event) {
					u.bug("go to: " + this._id);
					scene.show(scene.slides[this._id]);
				}

				// var class_name = node.className.replace(/copy|active/,"");
				// var heading = u.qs("h3", node).innerHTML;

				// // create li
				// var nav = u.ae(scene.nav, "li", {"class": class_name, "html": heading});
				// nav.bg = u.ae(scene.bg, "li", {"class": class_name+' bg'});
				// nav.preview = u.ae(scene.preview, "li", {"class": class_name+' preview'});
				// nav.copies = node;
				// nav.num = i;

				// // CLICK
				u.e.click(scene._next);
				u.e.click(scene._previous);
				scene._next.clicked = scene._previous.clicked = function(event) {

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
					// u.ac(nav, 'active');
					// u.ac(nav.copies, 'active');
					// u.ac(nav.bg, 'active');
					// u.a.setOpacity(nav.bg, 1);
					// u.a.setOpacity(nav.copies, 1);	

					// scene.selected_node = nav;
					// //scene.select(nav);

				} else {
					u.a.setOpacity(node, 0);
					//u.as(node, "left", u.browserWidth()+"px");
					// u.a.translate(nav.bg, 40, 0);
					// u.a.translate(nav.preview, -180, 0);
				}
			}
			
			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}

		

	
		

		// scene.nav = u.qs('ul.actions', scene)
		// scene.nav.slide = u.qs('ul.slides', scene);
		// scene.nav.slides = u.qsa('li.slide', scene.slide);




		// scene.select = function(node) {
		// 	//dont animate same twice
		// 	if (this.selected_node != node) {
		// 		//hide
		// 		if(this.selected_node) {
		// 			this.hide(node);
		// 		}
		// 		// show
		// 		else {
		// 			this.show(node);
		// 		}
		// 	}
		// }
		
		scene.hide = function(node) {
			u.bug("hide node: " + node);
			u.a.setOpacity(node, 0);
		// 	// Sett .active
		// 	u.rc(this.selected_node, 'active');
		// 	u.rc(this.selected_node.preview, 'active');
		// 	u.rc(this.selected_node.copies, 'active');

		// 	//Copies
		// 	u.a.transition(this.selected_node.copies, "all 500ms ease-in-out");
		// 	u.a.setOpacity(this.selected_node.copies, 0);
			
		// 	// Preview			
		// 	u.a.transition(this.selected_node.preview, "all 500ms ease-in-out");
		// 	u.a.translate(this.selected_node.preview, 180, 0);

		// 	// Move preview back after transition
		// 	this.selected_node.preview.transitioned = function() {
		// 		u.a.transition(this, "none");
		// 		this.transitioned = null;
		// 		u.a.translate(this, -180, 0);
		// 		console.log('done transition');
		// 	}

		// 	// Bg
		// 	u.a.transition(this.selected_node.bg, "all 500ms ease-in-out");
		// 	u.a.setOpacity(this.selected_node.bg, 0);
		// 	u.a.translate(this.selected_node.bg, 40, 0);

		// 	this.show(node);
		}

		scene.show = function(node) {
			u.bug("show node: " + node);

			// show
			//u.a.setOpacity(node, 1)

			// hide
			//u.a.setOpacity(this.current_node, 0);

			


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


		// 	// .active
		// 	u.ac(node, 'active');
		// 	u.ac(node.copies, 'active');
		// 	u.ac(node.preview, 'active');
		// 	u.ac(node.bg, 'active');
			
		// 	// Copies
		// 	u.a.transition(node.copies, "all 800ms ease-in-out 500ms");
		// 	u.a.setOpacity(node.copies, 1);
			
		// 	// Preview
		// 	u.a.transition(node.preview, "all 500ms ease-in-out");
		// 	u.a.translate(node.preview, 0, 0);

		// 	// Bg
		// 	u.a.transition(node.bg, "all 500ms ease-in-out");
		// 	u.a.setOpacity(node.bg, 1);
		// 	u.a.translate(node.bg, 0, 0);

		// 	// Hide reference
		// 	this.selected_node = node;
			
		}

    	
		// callback to scene ready
		scene.ready();

	}
}