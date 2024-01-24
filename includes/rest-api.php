<?php namespace WSUWP\Plugin\Resource_Links;

class Rest_API {


	public static function init() {

		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );

	}


	public static function register_routes() {

		register_rest_route(
			'wsu-resource-links/v1',
			'get-all-terms',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_all_terms' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'wsu-resource-links/v1',
			'get-all-terms-by-taxonomies',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_all_terms_by_taxonomies' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'wsu-resource-links/v1',
			'get-links',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_links' ),
				'permission_callback' => '__return_true',
			)
		);

	}


	public static function get_links( \WP_REST_Request $request ) {

		$links           = array();
		$params          = $request->get_params();
		$post_type       = Post_Type_Resource_Link::get( 'post_type' );
		$taxonomy_params = array(
			'categories' => 'category',
			'tags'       => 'post_tag',
		);

		// param defaults
		$params['count']    = intval( $params['count'] ?? -1 );
		$params['page']     = intval( $params['page'] ?? 1 );
		$params['offset']   = intval( $params['offset'] ?? 0 );
		$params['relation'] = $params['relation'] ?? 'OR';

		// build query args
		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => $params['count'],
			'paged'          => $params['page'],
			'offset'         => $params['offset'],
			'order'          => 'ASC',
			'orderby'        => 'title',
		);

		// query by taxonomies
		$taxonomy_queries = array();

		foreach ( $taxonomy_params as $key => $taxonomy_slug ) {
			if ( ! empty( $params[ $key ] ) ) {
				array_push(
					$taxonomy_queries,
					array(
						'taxonomy' => $taxonomy_slug,
						'field'    => 'term_id',
						'terms'    => array_map( 'trim', explode( ',', $params[ $key ] ) ),
					),
				);
			}
		}

		if ( ! empty( $taxonomy_queries ) ) {
			$args['tax_query']             = $taxonomy_queries;
			$args['tax_query']['relation'] = $params['relation'];
		}

		// query wp
		$query = new \WP_Query( $args );

		// iterate query results
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$id = get_the_ID();

				$content = apply_filters( 'the_content', get_the_content() );

				$link = array(
					'id'           => $id,
					'title'        => get_the_title(),
					'linkUrl'      => get_post_meta( $id, '_wsuwp_resource_link_url', true ),
					'source'       => get_post_meta( $id, '_wsuwp_resource_link_source', true ),
					'summary'      => $content,
					'modifiedDate' => get_the_modified_date( 'F j, Y' ),
					'categories'   => get_the_category( $id ),
					'tags'         => get_the_tags( $id ),
				);

				array_push( $links, $link );
			}
		}

		return $links;

	}


	public static function get_all_terms( \WP_REST_Request $request ) {

		$params = $request->get_params();

		if ( empty( $params['taxonomy'] ) ) {
			return new \WP_Error( 'error', 'No taxonomy provided', array( 'status' => 400 ) );
		}

		$terms = get_terms(
			array(
				'taxonomy'   => $params['taxonomy'],
				'orderby'    => 'name',
				'hide_empty' => false,
			)
		);

		if ( is_wp_error( $terms ) ) {
			return $terms;
		}

		return new \WP_REST_Response( $terms, 200 );

	}


	public static function get_all_terms_by_taxonomies( \WP_REST_Request $request ) {

		$response = array();
		$params   = $request->get_params();

		if ( empty( $params['taxonomies'] ) ) {
			return new \WP_Error( 'error', 'No taxonomy provided', array( 'status' => 400 ) );
		}

		$taxonomies = array_filter( explode( ',', $params['taxonomies'] ) ); // filter to remove empty items

		$terms = get_terms(
			array(
				'taxonomy'   => $taxonomies,
				'orderby'    => 'name',
				'hide_empty' => false,
			)
		);

		if ( is_wp_error( $terms ) ) {
			return new \WP_Error( 'error', $terms->get_error_message(), array( 'status' => 400 ) );
		}

		foreach ( $terms as $term ) {
			$response[ $term->taxonomy ][] = $term;
		}

		return new \WP_REST_Response( $response, 200 );

	}


}

Rest_API::init();
