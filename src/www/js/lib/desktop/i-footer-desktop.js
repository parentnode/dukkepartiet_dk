Util.Objects["footer"] = new function() {
	this.init = function(footer) {

		footer.ready = function() {
			
			u.bug("set footer color");
			
			// RED
			if (document.body.className == "candidates" || document.body.className == "candidate") {
				u.ac(this, "red");
			}
			// BLUE
			else {
				u.ac(this, "blue");
			}
		}

		// callback to footer ready
		footer.ready();

	}
}