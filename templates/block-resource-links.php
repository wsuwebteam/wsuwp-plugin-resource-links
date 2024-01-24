<ul class="wsu-content-list wsu-list--style-arrow wsu-list--columns-<?php echo esc_attr( $attrs['columns'] ); ?> <?php echo esc_attr( $attrs['className'] ); ?>">
	<?php foreach ( $links as $l ) : ?>
		<li class="wsu-content-list__item">
			<a href="<?php echo esc_attr( $l->linkUrl ); ?>" class="wsu-content-list__item-title"><?php echo esc_attr( $l->title ); ?></a>
			<div class="wsu-content-list__item-details">
				<?php if ( $attrs['showSource'] ) : ?>
					<span>
						<strong>Source:</strong> <?php echo esc_attr( $l->source ); ?>
					</span>
				<?php endif; ?>
				<?php if ( $attrs['showModifiedDate'] ) : ?>
					<span>
						<strong>Updated on:</strong> <?php echo esc_attr( $l->modifiedDate ); ?>
					</span>
				<?php endif; ?>
			</div>
			<?php echo $attrs['showSummary'] ? wp_kses_post( $l->summary ) : ''; ?>
			<?php if ( $attrs['showCategories'] || $attrs['showTags'] ) : ?>
				<div class="wsu-content-list__item-taxonomies">
					<?php
					if ( $attrs['showCategories'] && is_array( $l->categories ) ) :
						$categories        = array_map(
							function( $category ) {
								return $category->name;
							},
							$l->categories
						);
						$categories_string = implode( ', ', $categories );
						if ( ! empty( $categories_string ) ) :
							?>
						<span>
							<strong>Categories:</strong>
							<?php

								echo esc_attr( $categories_string );
							?>
						</span>
						<?php endif; ?>
					<?php endif; ?>

					<?php
					if ( $attrs['showTags'] && is_array( $l->tags ) ) :
						$tags        = array_map(
							function( $tag ) {
								return $tag->name;
							},
							$l->tags
						);
						$tags_string = implode( ', ', $tags );
						if ( ! empty( $tags_string ) ) :
							?>
						<span>
							<strong>Tags:</strong>
							<?php

								echo esc_attr( $tags_string );
							?>
						</span>
						<?php endif; ?>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</li>
	<?php endforeach; ?>
</ul>
