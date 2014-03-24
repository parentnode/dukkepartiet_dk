
<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeCandidate
*/
class TypeCandidate extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// candidates
		
		// name
		// area
		// url
		// responsibilities
		// background

		$this->db = SITE_DB.".item_candidate";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Enter the candidate's name", 
			"error_message" => "Name must be filled out"
		));

		// Area
		$this->addToModel("area", array(
			"type" => "string",
			"label" => "Work area",
			"required" => false,
			"hint_message" => "Where does the candidate operate?", 
			//"error_message" => "Name must be filled out"
		));

		// Link
		$this->addToModel("link", array(
			"type" => "string",
			"label" => "Online profile",
			"required" => false,
			"hint_message" => "Link to online profile", 
			//"error_message" => "Name must be filled out"
		));


		// Responsibilities
		$this->addToModel("responsibilities", array(
			"type" => "text",
			"label" => "Responsibilities text",
			"required" => true,
			"hint_message" => "Write candidates responsibilities here",
			"error_message" => "No, responsibilities! This is not good for the world"
		));

		// Background
		$this->addToModel("background", array(
			"type" => "text",
			"label" => "Background text",
			"required" => true,
			"hint_message" => "Write candidates background here",
			"error_message" => "It's gonna come out sooner than later anyway"
		));

		// Files
		$this->addToModel("files", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add candidate images here. Use png or jpg.",
			"error_message" => "Image does not fit requirements."
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

			message()->addMessage("Candidate order updated");
			return true;
		}

		message()->addMessage("Candidate order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>