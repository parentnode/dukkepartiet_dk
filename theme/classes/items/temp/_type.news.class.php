<?php
/**
* @package e-types.items
* This file contains item news maintenance functionality
*/

/**
* TypeNews
*/
class TypeNews extends Model {


	/**
	* Init, set varnames, validation rules
	*/
	function __construct() {

		$this->db = SITE_DB.".item_news";

		// Published
		$this->addToModel("published_at", array(
			"type" => "datetime",
			"label" => "Publish date (yyyy-mm-dd hh:mm:ss)",
			"pattern" => "^[\d]{4}-[\d]{2}-[\d]{2}[0-9\-\/ \:]*$",
			"hint_message" => "Date to publish news post on site. Until this date news post will remain hidden on site. Leave empty for instant publication", 
			"error_message" => "Date must be of format (yyyy-mm-dd hh:mm:ss)"
		));

		// Name
		$this->addToModel("name", array(
			"type" => "string",
			"label" => "Headline",
			"required" => true,
			"unique" => $this->db,
			"hint_message" => "News headline", 
			"error_message" => "Headline must be filled out"
		));

		// Description
		$this->addToModel("description", array(
			"id" => "short_description",
			"type" => "text",
			"label" => "News post description",
			"hint_message" => "Write a short description of the news post"
		));

		// Article
		$this->addToModel("article", array(
			"id" => "news_article",
			"type" => "text",
			"label" => "News post article",
			"hint_message" => "Full news post article"
		));

		// Type
		$this->addToModel("type", array(
			"type" => "string",
			"label" => "Content type",
			"value" => "news",
			"hint_message" => "Default: news - but you can overwrite this for sake of flexibility"
		));

		// Client
		$this->addToModel("client", array(
			"type" => "string",
			"required" => true,
			"label" => "Client or category",
			"hint_message" => "Related client or category of news. This text is shown in all listings of the news post.",
			"error_message" => "Client or category must be stated"
		));

		// Files
		$this->addToModel("files", array(
			"type" => "files",
			"label" => "Add media here",
			"max" => 6,
			"allowed_formats" => "png,jpg,mp4",
			"hint_message" => "Add news images/videos here. Use png or jpg, mp4 or mov.",
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


	// update item type - based on posted values
	function update($item_id) {

		$query = new Query();
		$IC = new Item();

		$query->checkDbExistance($this->db);


		$entities = $this->data_entities;
		$names = array();
		$values = array();


		$uploads = $IC->upload($item_id, array("proportion" => 1/1, "variant" => "square", "filegroup" => "image"));
		if($uploads) {
			$values[] = "image_square='".$uploads[0]["format"]."'";
		}

		$uploads = $IC->upload($item_id, array("proportion" => 437/568, "variant" => "portrait", "filegroup" => "image"));
		if($uploads) {
			$values[] = "image_portrait='".$uploads[0]["format"]."'";
		}

		$uploads = $IC->upload($item_id, array("proportion" => 280/175, "variant" => "landscape", "filegroup" => "image"));
		if($uploads) {
			$values[] = "image_landscape='".$uploads[0]["format"]."'";
		}

		$uploads = $IC->upload($item_id, array("proportion" => 1/1, "variant" => "video_square", "filegroup" => "video"));
		if($uploads) {
			$values[] = "video_square='mov'";
		}

		$uploads = $IC->upload($item_id, array("proportion" => 437/568, "variant" => "video_portrait", "filegroup" => "video"));
		if($uploads) {
			$values[] = "video_portrait='mov'";
		}

		$uploads = $IC->upload($item_id, array("proportion" => 280/175, "variant" => "video_landscape", "filegroup" => "video"));
		if($uploads) {
			$values[] = "video_landscape='mov'";
		}


		foreach($entities as $name => $entity) {
			if($entity["value"] != false && $name != "published_at" && $name != "status" && $name != "tags" && $name != "prices") {
				$names[] = $name;
				$values[] = $name."='".$entity["value"]."'";
			}
		}

		if($this->validateList($names, $item_id)) {
			if($values) {
				$sql = "UPDATE ".$this->db." SET ".implode(",", $values)." WHERE item_id = ".$item_id;
//					print $sql;
			}

			if(!$values || $query->sql($sql)) {
				return true;
			}
		}

		return false;
	}

}

?>