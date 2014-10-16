<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeInterview
*/
class TypeInterview extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		$this->db = SITE_DB.".item_interview";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "The name of the interview", 
			"error_message" => "Name must be filled out"
		));

		// URL
		$this->addToModel("url", array(
			"type" => "string",
			"label" => "Video link",
			"required" => false,
			"unique" => $this->db,
			"hint_message" => "Youtube link to interview", 
			"error_message" => "Video url must be filled out"
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

			message()->addMessage("Interview order updated");
			return true;
		}

		message()->addMessage("Interviews order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>