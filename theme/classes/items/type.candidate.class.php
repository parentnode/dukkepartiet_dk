
<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeCandidate
*/
class TypeCandidate extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
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
			//"error_message" => "Name must be filled out",
			"error_message" => "Area is invalid.",
		));

		// Link
		$this->addToModel("link", array(
			"type" => "string",
			"label" => "Online profile",
			"required" => false,
			"hint_message" => "Link to online profile", 
			//"error_message" => "Name must be filled out",
			"error_message" => "Link is invalid.",
		));


		// Responsibilities
		$this->addToModel("responsibilities", array(
			"type" => "text",
			"label" => "Responsibilities text",
			"hint_message" => "Write candidates responsibilities here",
			"error_message" => "No, responsibilities! This is not good for the world"
		));

		// Background
		$this->addToModel("background", array(
			"type" => "text",
			"label" => "Background text",
			"hint_message" => "Write candidates background here",
			"error_message" => "It's gonna come out sooner than later anyway"
		));

		// Files
		$this->addToModel("main", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add candidate images here. Use png or jpg.",
			"error_message" => "Image does not fit requirements."
		));

	}

}

?>