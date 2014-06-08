<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeNews
*/
class TypeVision extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		$this->db = SITE_DB.".item_vision";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every vision deserves a name - just write a few words, which uniquely identifies the vision. It is for the system.", 
			"error_message" => "Name must be filled out"
		));

		// Description
		$this->addToModel("vision", array(
			"type" => "text",
			"label" => "Vision text",
			"required" => true,
			"hint_message" => "Write the vision here",
			"error_message" => "Without a vision there is no vision?"
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

			message()->addMessage("Vision order updated");
			return true;
		}

		message()->addMessage("Vision order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>