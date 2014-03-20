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
			page.scrolled = function() {}

			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
//				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!u.hc(this, "ready")) {

					// page is ready
					u.addClass(this, "ready");

					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// recalculate content height
					this.resized();

					// build navigation
					this.initNavigation();

				}
			}

			// Content is ready - called from page.ready and scenes
			page.cN.ready = function() {
				u.bug("page.cN ready:" + page.intro + ", " + u.hc(page, "ready") + ", " + u.hc(this, "ready"));
				
			}

			page.initNavigation = function() {
				// get ul.primary
				this.primary = u.qs("ul.primary", page.nN);

				// add servicenavigation to header
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				u.ae(this.nN, this.servicenavigation)

				// add menu icon
				this.nav_icon = u.ae(this.nN, "div", {"class": "nav_icon"});
				u.e.click(this.nav_icon);
				
				// open/ close menu
				this.nav_icon.clicked = function(event) {

					page.primary.transitioned = function() {
						u.a.transition(this, "none");
					}

					if (u.hc(page.primary, "open")) {
						// remove class = close
						u.a.transition(page.primary, "all 0.25s ease-out");
						u.a.setHeight(page.primary, 0);
						u.rc(page.primary, "open");
					} else {
						//add class = open
						u.ac(page.primary, "open");
						u.a.transition(page.primary, "all 0.3s ease-in-out");
						u.a.setHeight(page.primary, 240);
					}
				}
				
			}

			

			// ready to start page builing process
			page.ready();

		//}
	}
}

// Controlled initialization
// function static_init() {
// 	u.o.page.init(u.qs("#page"));
// }
// u.e.addDOMReadyEvent(static_init);

u.e.addDOMReadyEvent(u.init);




