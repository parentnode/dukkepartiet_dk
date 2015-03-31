<?php
/**
* @package dukkepartiet.items
*/

/**
* Type
*/
class TypeCounter extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_counter";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Counter name",
			"required" => true,
			"hint_message" => "Name must be filled out but will not be shown", 
			"error_message" => "Name must be filled out"
		));

		// Text
		$this->addToModel("text", array(
			"type" => "text",
			"label" => "Counter text",
			"required" => true,
			"hint_message" => "Write the counter intro text here",
			"error_message" => "No intro text?"
		));

		// Counter
		$this->addToModel("counter", array(
			"type" => "number",
			"label" => "Count",
			"required" => true,
			"hint_message" => "Current number of counter",
			"error_message" => "None is not very much - you can do better than that"
		));
	}

}

?>