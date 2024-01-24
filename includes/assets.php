<?php namespace WSUWP\Plugin\Resource_Links;

class Scripts {

	public static function register_block_editor_assets() {

		$editor_asset = include Plugin::get( 'dir' ) . 'assets/dist/editor.asset.php';

		wp_register_script(
			'wsuwp-plugin-resource-links-editor-scripts',
			Plugin::get( 'url' ) . 'assets/dist/editor.js',
			$editor_asset['dependencies'],
			$editor_asset['version']
		);

		wp_register_style(
			'wsuwp-plugin-resource-links-editor-styles',
			Plugin::get( 'url' ) . 'assets/dist/editor.css',
			array(),
			$editor_asset['version']
		);

	}


	public static function enqueue_assets( $hook ) {

		if ( 'post.php' === $hook || 'post-new.php' === $hook ) {
			$script = self::get_inline_wsuwp_data();
			wp_add_inline_script( 'wsuwp-plugin-resource-links-editor-scripts', $script, 'before' );
		}

	}


	private static function get_inline_wsuwp_data() {

		$script      = 'var WSUWP_RESOURCE_LINKS_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= 'wpVersion: "' . get_bloginfo( 'version' ) . '",';
			$script .= '};';

		return $script;

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block_editor_assets' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::enqueue_assets', 10, 1 );

	}
}

Scripts::init();
