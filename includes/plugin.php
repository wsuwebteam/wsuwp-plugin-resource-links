<?php namespace WSUWP\Plugin\Resource_Links;

class Plugin {


	private static $version = '0.0.1';


	public static function get( $property ) {

		switch ( $property ) {

			case 'version':
				return self::$version;

			case 'dir':
				return plugin_dir_path( dirname( __FILE__ ) );

			case 'url':
				return plugin_dir_url( dirname( __FILE__ ) );

			case 'template_dir':
				return plugin_dir_path( dirname( __FILE__ ) ) . '/templates';

			default:
				return '';

		}

	}

	public static function init() {

		include_once __DIR__ . '/block-resource-link.php';
		include_once __DIR__ . '/block-resource-links.php';
		require_once __DIR__ . '/post-type-resource-link.php';
		include_once __DIR__ . '/assets.php';
		include_once __DIR__ . '/rest-api.php';

	}


	public static function require_class( $class_name ) {

		require_once self::get( 'dir' ) . '/classes/class-' . $class_name . '.php';

	}
}

Plugin::init();
