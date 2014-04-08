<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeNews
*/
class TypeBill extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

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

		// Tags
		$this->addToModel("tags", array(
			"type" => "tags",
			"label" => "Add tag",
			"hint_message" => "Start typing to get suggestions"
		));

		parent::__construct();
	}


	function updateOrder($action) {

		if(count($action) > 1) {

			$query = new Query();

			for($i = 1; $i < count($action); $i++) {
				$item_id = $action[$i];
				$query->sql("UPDATE ".$this->db." SET position = ".($i)." WHERE item_id = ".$item_id);
			}

			message()->addMessage("Bill order updated");
			return true;
		}

		message()->addMessage("Bill order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>