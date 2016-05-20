module.exports = {
	generate: {
		expand: true,
		cwd: './frontend/src/sprite_source',
		src: ['**/*.svg'],
		dest: './',
		options: {
			shape: {
				dimension: {
					maxWidth: 64,
					maxHeight: 64
				},
				spacing: {
					padding: 4
				}
			},
			mode: {
				view: {
					dest: './',
					sprite: '<%= meta.application.docrootFolder %>/images/svg-sprite.svg',
					bust: false,
					render: {
						scss: {
							template: './config/build/sprite.scss',
							dest: './frontend/src/scss/sprites-svg.scss'
						}
					}
				}
			}
		}
	}
}