
// custom initializations
Util.Form.customInit["postalcity"] = function(field) {

	field._input = u.qs("input.postal", field);
	field._input_city = u.qs("input.city", field);

	field._input.field = field;
	field._input_city.field = field;

	u.f.formIndex(field._input.form, field._input);
	u.f.formIndex(field._input_city.form, field._input_city);
}


// custom initializations
Util.Form.customInit["cpr"] = function(field) {

	field._input = u.qs("input.cpr1", field);

	// jump to next field when length is 6
	field._input.updated = function() {
		if(this.val().length == 6) {
			this.field._input_cpr2.focus();
		}
	}

	field._input_cpr2 = u.qs("input.cpr2", field);

	field._input.autocomplete = "Off";
	field._input_cpr2.autocomplete = "Off";

	field._input.field = field;
	field._input_cpr2.field = field;

	u.f.formIndex(field._input.form, field._input);
	u.f.formIndex(field._input_cpr2.form, field._input_cpr2);
}


// custom validations
Util.Form.customValidate["postalcity"] = function(iN) {

	if(u.hc(iN, "postal")) {

		// min and max length
		min = 1000;
		max = 9999;

		if(
			!isNaN(iN.val()) && 
			iN.val() >= min && 
			iN.val() <= max
		) {
			u.f.fieldCorrect(iN);
		}
		else {
			u.f.fieldError(iN);
		}

	}

	if(u.hc(iN, "city")) {

		// min and max length
		min = 1;
		max = 255;

		if(
			iN.val().length >= min &&
			iN.val().length <= max
		) {
			u.f.fieldCorrect(iN);
		}
		else {
			u.f.fieldError(iN);
		}

	}

}




// custom validations
Util.Form.customValidate["cpr"] = function(iN) {

	if(u.hc(iN, "cpr1")) {

		// min and max length
		min = 10101;
		max = 311299;

		if(
			!isNaN(iN.val()) && 
			iN.val() >= min && 
			iN.val() <= max
		) {
			u.f.fieldCorrect(iN);
		}
		else {
			u.f.fieldError(iN);
		}

	}

	if(u.hc(iN, "cpr2")) {

		// min and max length
		min = 0;
		max = 9999;

		if(
			!isNaN(iN.val()) && 
			iN.val() >= min && 
			iN.val() <= max
		) {
			u.f.fieldCorrect(iN);
		}
		else {
			u.f.fieldError(iN);
		}

	}

}
