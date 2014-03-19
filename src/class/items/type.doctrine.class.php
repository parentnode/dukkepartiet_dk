<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeNews
*/
class TypeDoctrine extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		$this->db = SITE_DB.".item_doctrine";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every doctrine deserves a name - just write a few words, which uniquely identifies the doctrine", 
			"error_message" => "Name must be filled out"
		));

		// Description
		$this->addToModel("doctrine", array(
			"type" => "text",
			"label" => "Doctrine text",
			"required" => true,
			"hint_message" => "Write the doctrine here",
			"error_message" => "Without a doctrine there is no doctrine?"
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

			message()->addMessage("Doctrine order updated");
			return true;
		}

		message()->addMessage("Doctrine order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>