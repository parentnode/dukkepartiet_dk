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
			}

			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!u.hc(this, "ready")) {

					// page is ready
					u.addClass(this, "ready");

					// build navigation
					//this.initNavigation();

				}
			}

			// Content is ready - called from page.ready and scenes
			page.cN.ready = function() {
				u.bug("page.cN ready:" + u.hc(page, "ready") + ", " + u.hc(this, "ready"));
				
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




