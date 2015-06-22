<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeSlogan
*/
class TypeIntroduction extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_introduction";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every introduction deserves a name - just write a few words, which uniquely identifies the introduction", 
			"error_message" => "Name must be filled out"
		));

		// Text
		$this->addToModel("text", array(
			"type" => "text",
			"label" => "Text",
			"required" => true,
			"hint_message" => "Write the text",
			"error_message" => "Text must be filled out"
		));

		// URL
		$this->addToModel("url", array(
			"type" => "string",
			"label" => "Url",
			"hint_message" => "This text can link to a subpage"
		));

	}

}

?>