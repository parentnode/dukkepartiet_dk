u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {
		
		//if(u.hc(page, "i:page")) {
			
			// header reference
			page.hN = u.qs("#header");

			// content reference
			page.cN = u.qs("#content");

			// navigation reference
			page.nN = u.qs("#navigation");
			page.nN = u.ie(page.hN, page.nN);

			// footer reference
			page.fN = u.qs("#footer");


			// global resize handler 
			page.resized = function() {
				// if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				// 	page.cN.scene.resized();
				// }
			}

			// global scroll handler 
			page.scrolled = function() {
				u.bug("scrolled");

				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

				var scroll_y = u.scrollY();
				var browser_h = u.browserH();
				var i, node;
				//u.bug("boom: " + page.scenes);
				for (i = 0; node = page.scenes[i]; i++) {

					abs_y = u.absY(node);

					//if(abs_y - 200 < scroll_y && abs_y + 200 > scroll_y) {
					if(abs_y-35 <= scroll_y && abs_y + node.offsetHeight > scroll_y) {

						//u.bug("found: " +  node);
							
						// RED
						if (u.hc(node, "red")) {
							u.ac(page.nN, "red");
							u.rc(page.nN, "blue");
						}
						// BLUE
						else {
							u.ac(page.nN, "blue");
							u.rc(page.nN, "red");
						}

					}
					// remove 
					else {
						//u.rc(node, "active");
					}
				}
			}

			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!u.hc(this, "ready")) {

					// page is ready
					u.addClass(this, "ready");

					// build navigation
					this.initNavigation();

					// store scenes for scroll
					this.scenes = u.qsa("#content .scene", this);

					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// resize / scroll straight away!
					this.resized();
					this.scrolled();
				}
			}

			// Content is ready - called from page.ready and scenes
			page.cN.ready = function() {
				u.bug("page.cN ready:" + u.hc(page, "ready") + ", " + u.hc(this, "ready"));
				
			}

			// page.initScrollPoint = function() {

			// 	this.scenes = u.qsa("#content .scene", this);
			// 	var i, node;
			// 	for (i = 0; node = this.scenes[i]; i++) {
			// 		//u.bug("node: " + u.absY(node))

			// 		if (!this.scrollPoint) {
			// 			node.sceneY = 
			// 			this.scrollPoint = {"sceneY": u.absY(node)};
			// 		}
			// 		// not undefined
			// 		else {
			// 			this.scrollPoint += {"sceneY": u.absY(node)};
			// 		}
			// 	}
			// 	u.bug("scrollPoint:  " + this.scrollPoint)

			// }

			page.initNavigation = function() {

				// create logo div
				this.logo = u.ae(this.nN, "div", {"class": "logo"});
				u.ce(this.logo)
				this.logo.clicked = function(event) {
					location.href = "/";
				}

				// get ul.primary
				this.primary = u.qs("ul.primary", page.nN);
				this.primary.li = u.qsa("li a", this.primary);

				// set active class in menu
				var i, node;
				for (i = 0; node = this.primary.li[i]; i++) {
					if (document.body.className == node.className) {
						u.ac(node, "active");
					}
				}

				// add servicenavigation to header
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				this.servicenavigation = u.ae(this.nN, this.servicenavigation)

				// add social links to header
				this.social = u.qs(".social", page.fN).cloneNode(true);
				this.social = u.ae(this.nN, this.social)

				// add menu icon
				this.nav_icon = u.ae(this.nN, "div", {"class": "nav_icon"});
				u.e.click(this.nav_icon);
				
				// open/ close menu
				this.nav_icon.clicked = function(event) {

					
					if (u.hc(page.hN, "open")) {
						// CLOSE MENU
						u.a.setHeight(page.nN, 0);
						u.rc(page.hN, "open");

						// scroll to original place
						//var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						u.as(page.cN, "display", "block");
						document.body.scrollTop = this.scroll_y;

						page.scrolled();
						
					} else {
						// OPEN MENU
						u.ac(page.hN, "open");
						u.a.setHeight(page.nN, u.browserHeight());
						var height = u.browserHeight() - page.social.offsetHeight;
						var middle = (height/2) - (page.primary.offsetHeight/2);
						u.as(page.primary, "top", middle+"px");

						// store scrolled state
						this.scroll_y = u.scrollY();
						u.as(page.cN, "display", "none");
					}
				}
				
			}

			

			// ready to start page builing process
			//page.ready();

		//}
	}
}

// Controlled initialization
// function static_init() {
// 	u.o.page.init(u.qs("#page"));
// }
// u.e.addDOMReadyEvent(static_init);

u.e.addDOMReadyEvent(u.init);




