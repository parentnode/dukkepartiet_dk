Util.Modules["footer"] = new function() {
	this.init = function(footer) {

		// RED
		if(u.hc(document.body, "candidates|candidate|reform|vision|interview|action|mask|front")) {
			u.ac(footer, "red");
		}
		// BLUE
		else {
			u.ac(footer, "blue");
		}

	}
}