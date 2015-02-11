<?php
/**
* @package dukkepartiet.items
*/

/**
* TypeDoctrine
*/
class TypeDoctrine extends Itemtype {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		// construct ItemType before adding to model
		parent::__construct(get_class());


		// itemtype database
		$this->db = SITE_DB.".item_doctrine";


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
		$this->addToModel("doctrine", array(
			"type" => "text",
			"label" => "Doctrine text",
			"required" => true,
			"hint_message" => "Write the doctrine here",
			"error_message" => "Without a doctrine there is no doctrine?"
		));

	}

}

?>