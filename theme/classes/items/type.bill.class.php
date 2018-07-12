<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeBill
*/
class TypeBill extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_bill";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every bill deserves a name - just write a few words, which uniquely identifies the bill", 
			"error_message" => "Name must be filled out"
		));

		// Description
		$this->addToModel("bill", array(
			"type" => "text",
			"label" => "Bill text",
			"required" => true,
			"hint_message" => "Write the bills here",
			"error_message" => "Without a bill there is no bill?"
		));

	}

}

?>