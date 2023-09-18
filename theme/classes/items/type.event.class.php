<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeEvent
*/
class TypeEvent extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_event";


		// Published / Event date+time
		$this->addToModel("published_at", array(
			"type" => "datetime",
			"label" => "Event date and time (yyyy-mm-dd hh:mm)",
			"required" => true,
			"pattern" => "^[\d]{4}-[\d]{2}-[\d]{2} [0-9]{2}:[0-9]{2}$",
			"hint_message" => "Date and time of event (yyyy-mm-dd hh:mm)", 
			"error_message" => "Date must be of format (yyyy-mm-dd hh:mm)"
		));

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
		$this->addToModel("description", array(
			"type" => "text",
			"label" => "Description",
			"required" => true,
			"hint_message" => "Describe the event",
			"error_message" => "Description must be filled out"
		));

		// Location
		$this->addToModel("location", array(
			"type" => "string",
			"label" => "Location",
			"required" => true,
			"hint_message" => "Location of the event", 
			"error_message" => "Location must be filled out"
		));

	}

}

?>