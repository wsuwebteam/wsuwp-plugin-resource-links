<?php namespace WSUWP\Plugin\Resource_Links;

class Block_Resource_Links {

	protected static $block_name    = 'wsuwp/resource-links';
	protected static $default_attrs = array(
		'className'        => '',
		'columns'          => 3,
		'showSource'       => true,
		'showModifiedDate' => true,
		'showSummary'      => true,
		'showCategories'   => true,
		'showTags'         => true,
		'categories'       => array(),
		'tags'             => array(),
		'count'            => -1,
		'offset'           => 0,
		'useAndLogic'      => false,
		'dataSource'       => '',
	);


	public static function render( $attributes, $content = '' ) {

		$attrs = array_merge( self::$default_attrs, $attributes );
		$links = self::get_links( $attrs );

		// var_dump( $attrs );
		// var_dump( $links );

		ob_start();

		include Plugin::get( 'template_dir' ) . '/block-resource-links.php';

		return ob_get_clean();

	}


	private static function get_links( $attrs ) {

		$data_source = $attrs['dataSource'] ? $attrs['dataSource'] : site_url();
		$categories  = ! empty( $attrs['categories'] ) ? implode( ',', array_column( $attrs['categories'], 'id' ) ) : '';
		$tags        = ! empty( $attrs['tags'] ) ? implode( ',', array_column( $attrs['tags'], 'id' ) ) : '';
		$count       = $attrs['count'] ? $attrs['count'] : '-1';
		$offset      = $attrs['offset'] ? $attrs['offset'] : '0';
		$relation    = $attrs['useAndLogic'] ? 'and' : 'or';

		$endpoint = $data_source . "/wp-json/wsu-resource-links/v1/get-links?count=$count&offset=$offset&tags=$tags&categories=$categories&relation=$relation";
		$response = wp_remote_get( $endpoint, array( 'timeout' => 20 ) );

		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			// return new \WP_Error( 'error', wp_remote_retrieve_body( $response ), array( 'status' => 500 ) );
			return array();
		}

		$body = wp_remote_retrieve_body( $response );

		return json_decode( $body );

	}


	public static function register_block() {

		register_block_type(
			self::$block_name,
			array(
				'render_callback' => array( __CLASS__, 'render' ),
				'api_version'     => 2,
				'editor_script'   => 'wsuwp-plugin-resource-links-editor-scripts',
				'editor_style'    => 'wsuwp-plugin-resource-links-editor-styles',
			)
		);

		add_filter(
			'wsu_allowed_blocks_filter',
			function ( $blocks ) {
				if ( ! in_array( self::$block_name, $blocks, true ) ) {
					array_push( $blocks, self::$block_name );
				}

				return $blocks;
			}
		);

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block' );

	}
}

Block_Resource_Links::init();
