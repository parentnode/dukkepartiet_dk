<?php
$access_item = false;
if(isset($read_access) && $read_access) {
	return;
}

include_once($_SERVER["FRAMEWORK_PATH"]."/config/init.php");


$action = $page->actions();
$output = new Output();
$fs = new FileSystem();



$page->bodyClass("approved");
$page->pageTitle("Declarations");


$fs->makeDirRecursively(PUBLIC_FILE_PATH."/declaration_approved_zips");
$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_archive");
$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_zip_archive");


if(is_array($action) && count($action)) {

	// LIST ITEM
	// Requires exactly two parameters /enable/#item_id#
	if(count($action) == 1 && $action[0] == "list") {

		$page->header(array("type" => "janitor"));
		$page->template("janitor/approved/list.php");
		$page->footer(array("type" => "janitor"));
		exit();

	}

	// DOWNLOAD ITEM
	else if(count($action) == 2 && $action[0] == "download") {
	

		$file = PUBLIC_FILE_PATH."/declaration_uploads/".$action[1];
		if(file_exists($file)) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header("Content-Type: application/force-download");
			header('Content-Disposition: attachment; filename=' . urlencode(basename($file)));
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file));
			ob_clean();
			flush();
			readfile($file);
		}

//		header("Location: /admin/declaration/list");
		exit();
	
	}

	// ARCHIVE ITEM
	else if(count($action) == 2 && $action[0] == "archive") {
	

		$file = PUBLIC_FILE_PATH."/declaration_uploads/".$action[1];
		if(file_exists($file)) {
			$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_archive");
			copy($file, PRIVATE_FILE_PATH."/declaration_approved_archive/".$action[1]);
			unlink($file);
		}
		$output->screen(array("cms_status" => "success"));

//		header("Location: /admin/declaration/list");
		exit();
	
	}

	// DOWNLOAD BUNDLE
	else if(count($action) == 2 && $action[0] == "downloadBundle") {
	

		$file = PUBLIC_FILE_PATH."/declaration_approved_zips/".$action[1];
		if(file_exists($file)) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header("Content-Type: application/force-download");
			header('Content-Disposition: attachment; filename=' . urlencode(basename($file)));
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Pragma: public');
			header('Content-Length: ' . filesize($file));
			ob_clean();
			flush();
			readfile($file);
		}

//		header("Location: /admin/declaration/list");
		exit();
	
	}
	// ARCHIVE BUNDLE
	else if(count($action) == 2 && $action[0] == "archiveBundle") {
	

		$file = PUBLIC_FILE_PATH."/declaration_approved_zips/".$action[1];
		if(file_exists($file)) {
			$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_zip_archive");
			copy($file, PRIVATE_FILE_PATH."/declaration_approved_zip_archive/".$action[1]);
			unlink($file);
		}
		$output->screen(array("cms_status" => "success"));

//		header("Location: /admin/declaration/list");
		exit();
	
	}


	// BUNDLE ITEMS
	else if(count($action) == 1 && $action[0] == "bundleAll") {
	
		set_time_limit(0);

		$folder = PUBLIC_FILE_PATH."/declaration_uploads";
		$files = $fs->files($folder);

		$fs->makeDirRecursively(PUBLIC_FILE_PATH."/declaration_approved_zips");
		$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_archive");
		$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declaration_approved_zip_archive");

		arsort($files);

		$current_date = false;
		$zip_opened = false;
		$zip = new ZipArchive();
		foreach($files as $file) {
			$date = date("Y-m-d", preg_replace("/\.[a-z]{3}/", "", basename($file)));

			// dont bundle todays pdfs
			if($date != date("Y-m-d")) {

				if($current_date != $date) {

					// close open zip if it exists
					if($zip_opened && $current_date) {
//						print "close zip" . "<br>";
					    $zip->close();
					}

					$current_date = $date;
//					print $current_date."<br>";

					$zip_file = PUBLIC_FILE_PATH."/declaration_approved_zips/approved_bundle_".$current_date.".zip";
//					print "create new zip:" . $zip_file . "<br>";
					$zip->open($zip_file, ZipArchive::CREATE);
					$zip_opened = true;
				}

//				print "Add to zip:" . $file . "<br>";
				$new_file = PRIVATE_FILE_PATH."/declaration_approved_archive/".basename($file);
				copy($file, $new_file);
				unlink($file);

				$zip->addFile($new_file, basename($new_file));
			}

		}
		if($zip_opened) {
			$zip->close();
		}

		print "ok";
		exit();
	
	}



}

$page->header();
$page->template("404.php");
$page->footer();

?>
