<?php namespace WSUWP\Plugin\Resource_Links;

class Post_Type_Resource_Link {

	private static $slug = 'resource_link';

	private static $attributes = array(
		'labels'        => array(
			'name'               => 'Resource Links',
			'singular_name'      => 'Link',
			'all_items'          => 'All Links',
			'view_item'          => 'View Link',
			'add_new_item'       => 'Add New Link',
			'add_new'            => 'Add New',
			'edit_item'          => 'Edit Link',
			'update_item'        => 'Update Link',
			'search_items'       => 'Search Resource Links',
			'not_found'          => 'Not found',
			'not_found_in_trash' => 'Not found in Trash',
		),
		'description'   => 'Resource links',
		'hierarchical'  => false,
		'show_ui'       => true,
		'show_in_rest'  => true,
		'menu_icon'     => 'dashicons-index-card',
		'taxonomies'    => array(
			'post_tag',
			'category',
		),
		'supports'      => array(
			'title',
			'editor',
			'custom-fields',
		),
		'template'      => array(
			array(
				'wsuwp/resource-link',
				array(),
			),
		),
		'template_lock' => 'all',
		'rewrite'       => false,
	);


	public static function get( $name ) {

		switch ( $name ) {

			case 'post_type':
				return self::$slug;
			default:
				return '';

		}

	}


	public static function register_post_type() {

		register_post_type( self::$slug, self::$attributes );

		// register meta fields
		$meta_fields = array(
			'_wsuwp_resource_link_url',
			'_wsuwp_resource_link_source',
		);

		foreach ( $meta_fields as $meta_field ) {
			register_post_meta(
				self::$slug,
				$meta_field,
				array(
					'type'          => 'string',
					'show_in_rest'  => true,
					'single'        => true,
					'auth_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_post_type' );

	}
}

Post_Type_Resource_Link::init();
