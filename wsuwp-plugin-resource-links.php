<?php
/**
 * Plugin Name: WSUWP Resource Links
 * Plugin URI: https://github.com/wsuwebteam/wsuwp-plugin-resource-links
 * Description: Plugin to manage resource links.
 * Version: 0.0.5
 * Requires PHP: 7.0
 * Author: Washington State University, Danial Bleile, Dan White
 * Author URI: https://web.wsu.edu/
 * Text Domain: wsuwp-plugin-resource-links
 */


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Initiate plugin
require_once __DIR__ . '/includes/plugin.php';
