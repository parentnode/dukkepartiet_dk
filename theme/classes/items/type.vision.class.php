<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeVision
*/
class TypeVision extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
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

	}

}

?>