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


			// scenes array
			page.scenes = [];


			// global resize handler 
			page.resized = function() {
				u.bug("page resized");

				page.browser_h = u.browserHeight();
				page.browser_w = u.browserWidth();


				// set navigation height
				u.as(page.nN, "height", (page.browser_h - 90) + "px");


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

				if(page.scenes.length) {
					for(i = 0; scene = page.scenes[i]; i++) {
						if(scene && typeof(scene.resized) == "function") {
							scene.resized();
						}
					}
				}

				page.offsetHeight;
			}

			// global scroll handler 
			page.scrolled = function() {
				u.bug("page scrolled: " + page.scenes.length);

				page.scroll_y = u.scrollY();


				// forward scroll event to current scene
				if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
					page.cN.scene.scrolled();
				}

				// handle multiple scenes (frontpage has three scenes)
				if(page.scenes.length) {
					for(i = 0; scene = page.scenes[i]; i++) {
						if(scene && typeof(scene.scrolled) == "function") {
							scene.scrolled();
						}
					}
				}

			}

			// Page is ready - called from several places, evaluates when page is ready to be shown
			page.ready = function() {
				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {

					var correct_page = new RegExp(document.domain+"$|"+document.domain+"\/$|"+document.domain+"\/vaelgererklaering|"+document.domain+"\/upload");
	
					if(!location.href.match(correct_page)) {
//						location.href = "/";
					}

					// page is ready
					this.is_ready = true;


					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// build navigation
					this.initNavigation();

					// resize / scroll straight away!
					this.resized();
					this.scrolled();

				}
			}

			// init navigation
			page.initNavigation = function() {


				// create logo div
				this.logo = u.ae(this.hN, "div", {"class": "logo"});
				u.ce(this.logo)
				this.logo.clicked = function(event) {
					location.href = "/";
				}

				// get ul.primary
				this.primary = u.qs("ul.primary", page.nN);
				this.primary.li = u.qsa("li a", this.primary);

				// set active class in menu
				var i, node;
				for(i = 0; node = this.primary.li[i]; i++) {
					if(u.hc(document.body, node.className)) {
						u.ac(node, "active");
					}
				}

				// add servicenavigation to header
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				this.servicenavigation = u.ae(this.nN, this.servicenavigation)


				// add menu icon
				this.nav_icon = u.qs(".servicenavigation li.navigation", this.hN);
				u.e.click(this.nav_icon);
				
				// open/ close menu
				this.nav_icon.clicked = function(event) {

					// menu already open
					// close menu
					if(u.hc(page.hN, "open")) {

						u.rc(page.hN, "open");
						u.as(page.nN, "display", "none");

						// scroll to original place
						u.as(page.cN, "display", "block");
						u.as(page.fN, "display", "block");
						window.scrollTo(0, this.scroll_y);
					}

					// open menu
					else {

						u.ac(page.hN, "open");
						u.as(page.nN, "display", "block");

						// store scrolled state
						this.scroll_y = u.scrollY();
						u.as(page.cN, "display", "none");
						u.as(page.fN, "display", "none");
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




