<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeAction
*/
class TypeAction extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_action";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every action deserves a name - just write a few words, which uniquely identifies the action", 
			"error_message" => "Name must be filled out"
		));

		// Description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Description",
			"required" => true,
			"hint_message" => "Describe the action",
			"error_message" => "Description must be filled out"
		));

		// Link  - youtube
		$this->addToModel("link", array(
			"type" => "string",
			"label" => "Youtube url",
			"pattern" => "http\:\/\/www.youtube.com\/watch\?v\=[a-zA-Z0-9_-]+",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Write a valid Youtube url - Should look like this: http://www.youtube.com/watch?v=[VIDEO_ID]", 
			"error_message" => "Name must be correct Youtube url like: http://www.youtube.com/watch?v=[VIDEO_ID]"
		));

		// Files
		$this->addToModel("main", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_sizes" => "480x270",
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add action images here. Use png or jpg in 480x270.",
			"error_message" => "Image does not fit requirements."
		));

	}

}

?>