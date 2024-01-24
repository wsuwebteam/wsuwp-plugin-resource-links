<?php namespace WSUWP\Plugin\Resource_Links;

class Block_Resource_Link {

	protected static $block_name = 'wsuwp/resource-link';

	public static function register_block() {

		register_block_type(
			self::$block_name,
			array(
				'api_version'   => 2,
				'editor_script' => 'wsuwp-plugin-resource-links-editor-scripts',
				'editor_style'  => 'wsuwp-plugin-resource-links-editor-styles',
			)
		);

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block' );

	}

}

Block_Resource_Link::init();
