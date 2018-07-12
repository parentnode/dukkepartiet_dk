<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeSlogan
*/
class TypeSlogan extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_slogan";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every slogan deserves a name - just write a few words, which uniquely identifies the slogan", 
			"error_message" => "Name must be filled out"
		));

		// URL
		$this->addToModel("url", array(
			"type" => "string",
			"label" => "Url",
			"required" => false,
			"hint_message" => "This slogan can link to a subpage"
		));

		// Files
		$this->addToModel("main", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add slogan images here. Use png or jpg.",
			"error_message" => "Image does not fit requirements."
		));

	}

}

?>