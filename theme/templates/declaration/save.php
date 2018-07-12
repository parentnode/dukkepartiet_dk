<?php
global $slug;
global $slug_data_address;



// function quickGet($var) {
// 	return getVar($var);
// //	return utf8_decode(getVar($var));
// //	return urlencode(getVar($var));
// }

// make sure relevant filestructure exists
$fs = new FileSystem();
$fs->makeDirRecursively(PRIVATE_FILE_PATH."/declarations");
$fs->makeDirRecursively(PUBLIC_FILE_PATH."/declarations");


// get signature id
$signature_id = session()->value("signature_id");

// save data for pdf printing
$string = "slug=".session()->value("slug")."\n";
$string .= "name=".session()->value("name")."\n";
$string .= "address1=".session()->value("address1")."\n";
$string .= "address2=".session()->value("address2")."\n";
$string .= "postal=".session()->value("postal")."\n";
$string .= "city=".session()->value("city")."\n";
$string .= "municipality=".session()->value("municipality")."\n";
$string .= "cpr_1=".session()->value("cpr_1")."\n";
$string .= "cpr_2=".session()->value("cpr_2")."\n";
$string .= "date_data=".session()->value("date_data")."\n";
$string .= "signature_data=".session()->value("signature_data")."\n";

$info_file = PRIVATE_FILE_PATH."/declarations/".$signature_id;
$fp = fopen($info_file, "w+");
fwrite($fp, $string);
fclose($fp);


// prepare request url
$url = escapeshellarg(SITE_URL."/vaelgererklaering/print/".$signature_id);

// prepare save path + declaration id
$declaration_id = time();
$declaration_file = PUBLIC_FILE_PATH."/declarations/".$declaration_id.".pdf";

// check wkhtmltox path
$wkhtmltox_path = false;
if(!preg_match("/command not found/i", exec("static_wkhtmltopdf 2>&1"))) {
	$wkhtmltox_path = "static_wkhtmltopdf";
}

// Putting together the command for `shell_exec()`
$command = "$wkhtmltox_path -s A4 $url $declaration_file";
// Generate the image
$output = shell_exec($command." 2>&1");


// delete info file after printing
unlink($info_file);

// validate result
if(preg_match("/Done/", $output) && file_exists($declaration_file) && filesize($declaration_file) > 100000) {

	header("Location: /vaelgererklaering/receipt");
	exit();
	
}

// delete bad declaration file
if(file_exists($declaration_file)) {
	unlink($declaration_file);
}

// return error page
header("Location: /vaelgererklaering/error");
exit();


//
// function quickGet($var) {
// 	return getVar($var);
// //	return utf8_decode(getVar($var));
// //	return urlencode(getVar($var));
// }
//
// $fs = new FileSystem();
// $fs->makeDirRecursively(PRIVATE_FILE_PATH."/declarations");
// $fs->makeDirRecursively(PUBLIC_FILE_PATH."/declarations");
//
// $signature_id = session()->value("signature_id");
//
//
// $string = "name=".quickGet("name")."\n";
// $string .= "address1=".quickGet("address1")."\n";
// $string .= "address2=".quickGet("address2")."\n";
// $string .= "postal=".quickGet("postal")."\n";
// $string .= "city=".quickGet("city")."\n";
// $string .= "municipality=".quickGet("municipality")."\n";
// $string .= "cpr_1=".quickGet("cpr_1")."\n";
// $string .= "cpr_2=".quickGet("cpr_2")."\n";
// $string .= "date_data=".quickGet("date_data")."\n";
// $string .= "signature_data=".quickGet("signature_data")."\n";
//
// $info_file = PRIVATE_FILE_PATH."/declarations/".$signature_id;
//
// $fp = fopen($info_file, "w+");
// fwrite($fp, $string);
// fclose($fp);
//
//
//
// //$host = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"]."?";
// $host = ($_SERVER["HTTPS"] ? "https" : "http") . "://".$_SERVER["HTTP_HOST"]."/vaelgererklaering/print?signature_id=".$signature_id;
//
// $url = escapeshellarg($host);
// //$url = escapeshellarg($host . $param);
//
// //	print_r($_SERVER);
//
// $declaration_id = time();
// // Name of your output image
// $name = PUBLIC_FILE_PATH."/declarations/".$declaration_id.".pdf";
//
// $wkhtmltox_path = false;
//
// if(!preg_match("/command not found/i", exec("static_wkhtmltopdf 2>&1"))) {
// 	$wkhtmltox_path = "static_wkhtmltopdf";
// }
// // else if(!preg_match("/command not found/i", exec("/srv/sites/static_wkhtmltopdf 2>&1"))) {
// // 	$wkhtmltox_path = "/srv/sites/static_wkhtmltopdf";
// // }
//
//
// // Command to execute
// $command = $wkhtmltox_path." -s A4";
//
// // --width 800
// // Putting together the command for `shell_exec()`
// $ex = "$command $url " . $name;
//
// //print $ex;
// // Generate the image
// // NOTE: Don't forget to `escapeshellarg()` any user input!
// $output = shell_exec($ex);
//
//
// // delete info file
// unlink($info_file);
// session()->reset("signature_id");
// //header("Location: /vaelgererklaering/receipt?id=$declaration_id");
// header("Location: /vaelgererklaering/receipt");
// exit();
?>