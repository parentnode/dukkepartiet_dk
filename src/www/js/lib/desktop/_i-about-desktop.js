Util.Objects["about"] = new function() {
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
			
			u.bug("about");

			this.loadMapsAPI();

			// u.ac(this, "ready");
			// u.ac(page.cN, "ready");
			u.bug(page.cN);
			page.cN.ready();
		}
    	
    	scene.loadMapsAPI = function() {
			u.bug("loadMapsAPI");
			var id = u.randomString();
			u.ac(this, id);


			var script = document.createElement("script");
  			script.type = "text/javascript";
  			script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&" + "callback=map_" + id;
  			document.body.appendChild(script);
  			eval('window["map_' + id + '"] = function() {u.qs(".'+id+'").mapsApiReady();}');

  			
		}
		scene.mapsApiReady = function() {

			u.bug("maps loaded!!");
			this.gmap = u.ae(this, "div", {"class": "gmap"});
			this.overlay = u.ae(this, "div", {"class": "overlay"});

			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(55.674026, 12.570235),

				//center: myLatLng, //new google.maps.LatLng(57.703798, 11.958876),
				zoom: 16,
				mapTypeControl: false,
				panControl: false,
				zoomControl: true,
				scrollwheel: false,
				//navigationControl: false,
				//scaleControl: false,
				//draggable: false,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL
				},
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};

			var styles = [
				{
					stylers: [
						{ hue: "#00027a" },
						{ saturation: +20 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			];

			// SET Custom Location Icon
			// var myLatLng = new google.maps.LatLng(57.70559, 11.968347);
			// var image = 'haymaker_logo.png';
			// var beachMarker = new google.maps.Marker({
			// 	position: myLatLng,
			// 	map: map,
			// 	icon: image
			// });
			
			//u.qs(".map", scene);
			var map = new google.maps.Map(this.gmap, mapOptions);
			map.setOptions({styles: styles});

		}

		// callback to scene ready
		scene.ready();

	}
}