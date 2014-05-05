Util.Objects["footer"] = new function() {
	this.init = function(footer) {

		footer.ready = function() {
			
			u.bug("set footer color");
			
			this._class = document.body.className;
			
			// RED
			if (this._class == "candidates" || this._class == "candidate" || this._class == "reform" || this._class == "vision") {
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