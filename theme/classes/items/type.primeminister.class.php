<?php
/**
* @package dukkepartiet.items
*/

/**
* TypePrimeminister
*/
class TypePrimeminister extends Itemtype {


	public $db;


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_primeminister";


		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Name",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "The name of the candidate", 
			"error_message" => "Name must be filled out"
		));

		// URL
		$this->addToModel("url", array(
			"type" => "string",
			"label" => "Video link",
			"required" => false,
			"unique" => $this->db,
			"hint_message" => "Every candidate must have a video", 
			"error_message" => "Video url must be filled out"
		));

	}

}

?>