<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeNews
*/
class TypeAction extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		$this->db = SITE_DB.".item_action";

		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "Every slogan deserves a name - just write a few words, which uniquely identifies the slogan", 
			"error_message" => "Name must be filled out"
		));

		// Description
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Description",
			"required" => true,
			"hint_message" => "Describe the event",
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
		$this->addToModel("files", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 1,
			"allowed_formats" => "png,jpg",
			"hint_message" => "Add slogan images here. Use png or jpg.",
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

			message()->addMessage("Action order updated");
			return true;
		}

		message()->addMessage("Action order could not be updated - refresh your browser", array("type" => "error"));
		return false;

	}
}

?>