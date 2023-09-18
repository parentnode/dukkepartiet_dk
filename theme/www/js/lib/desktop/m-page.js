u.bug_console_only = true;

Util.Modules["page"] = new function() {
	this.init = function(page) {

//		if(u.hc(page, "i:page")) {

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
//				u.bug("page resized");

				page.browser_h = u.browserHeight();
				page.browser_w = u.browserWidth();


				// resize navigation, if open
				if(u.hc(page.hN, "open")) {
					u.a.setHeight(page.nN, page.browser_h);

					var height = page.browser_h - page.social.offsetHeight;
					var middle = (height/2) - (page.primary.offsetHeight/2);
					u.as(page.primary, "top", middle+"px", false);
				}

				// resize video container
				if(page.video_container) {
					u.as(page.video_container, "width", page.browser_w+"px", false);
					u.as(page.video_container, "height", page.browser_h+"px", false);

					var _top = Math.round((page.browser_h - page.video_player.offsetHeight) / 2);
					u.as(page.video_player, "top", _top+"px", false);
					u.as(page.video_close, "top", _top+"px", false);
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
//				u.bug("page scrolled" + page.scenes.length);

				page.scroll_y = u.scrollY();

				// adjusts navigation color
				var i, scene, abs_y;
				for(i = 0; scene = page.scenes[i]; i++) {

					abs_y = u.absY(scene);
					if(abs_y-35 <= page.scroll_y && abs_y + scene.offsetHeight > page.scroll_y) {

						// RED
						if(u.hc(scene, "red")) {
							u.ac(page.nN, "red");
							u.rc(page.nN, "blue");
						}
						// BLUE
						else {
							u.ac(page.nN, "blue");
							u.rc(page.nN, "red");
						}

					}
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
//				u.bug("page ready")

				// page is ready to be shown - only initalize if not already shown
				if(!this.is_ready) {

					// page is ready
					this.is_ready = true;


					// build navigation
					this.initNavigation();

					// store scenes for scroll
//					this.scenes = u.qsa("#content .scene", this);

					// set resize handler
					u.e.addEvent(window, "resize", page.resized);
					// set scroll handler
					u.e.addEvent(window, "scroll", page.scrolled);

					// resize / scroll straight away!
					this.resized();
					this.scrolled();
				}
			}


			// init navigation
			page.initNavigation = function() {

				// set navigation text scaling
				u.textscaler(page.nN, {".primary a":{
					"unit":"rem", 
					"min_size":1.7, 
					"min_width":600, 
					"max_size":4, 
					"max_width":1600
				}})


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
				for(i = 0; node = this.primary.li[i]; i++) {
					if(u.hc(document.body, node.className)) {
						u.ac(node, "active");
					}
				}

				// add servicenavigation to header
				this.servicenavigation = u.qs("ul.servicenavigation", page.fN).cloneNode(true);
				this.servicenavigation = u.ae(this.nN, this.servicenavigation)

				// add social links to header
				this.social = u.qs(".social", page.fN).cloneNode(true);
				this.social = u.ae(this.nN, this.social)

				this.facebook = u.ae(this.servicenavigation, u.qs(".facebook", this.social).cloneNode(true));

				// add menu icon
				this.nav_icon = u.ae(this.nN, "div", {"class": "nav_icon"});
				u.e.click(this.nav_icon);
				
				// open/ close menu
				this.nav_icon.clicked = function(event) {

					// menu already open
					// close menu
					if(u.hc(page.hN, "open")) {
						u.a.setHeight(page.nN, 0);
						u.rc(page.hN, "open");

						// scroll to original place
						u.as(page.cN, "display", "block");
						u.as(page.fN, "display", "block");
						window.scrollTo(0, this.scroll_y);

//						page.scrolled();
					}

					// open menu
					else {
						u.ac(page.hN, "open");
						u.a.setHeight(page.nN, u.browserHeight());
						var height = u.browserHeight() - page.social.offsetHeight;
						var middle = (height/2) - (page.primary.offsetHeight/2);
						u.as(page.primary, "top", middle+"px");

						// store scrolled state
						this.scroll_y = u.scrollY();
						u.as(page.cN, "display", "none");
						u.as(page.fN, "display", "none");
					}
				}
			}


			// general youtube player
			page.youtubeVideo = function(youtube_id) {

				if(!page.video_container) {

					page.video_container = u.ae(document.body, "div", {"id":"youtube"});

					page.video_player = u.ae(page.video_container, "div", {"class":"player"});
					page.video_close = u.ae(page.video_container, "div", {"class":"close"});

					u.ce(page.video_close);
					// click play - inject iframe
					page.video_close.clicked = function(event) {
						u.as(page.video_container, "display", "none");
						page.video_player.innerHTML = "";
						u.as(document.body, "overflow", "auto");
					}

				}

				u.as(page.video_container, "display", "block");

				var player_html = '<iframe width="720" height="405" src="//www.youtube.com/embed/' + youtube_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>'
				page.video_player.innerHTML = player_html;

				u.as(document.body, "overflow", "hidden");

				u.as(page.video_container, "height", page.browser_h+"px");
				u.as(page.video_container, "width", page.browser_w+"px");

				var _top = Math.round((page.browser_h - page.video_player.offsetHeight) / 2);

				u.as(page.video_player, "top", _top+"px");
				u.as(page.video_close, "top", _top+"px");

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




