module.exports = {
	images: {
		src: './frontend/src/sprite_source/*.png',
		dest: '<%= meta.application.docrootFolder %>/images/spritesheet.png',
		imgPath: '../images/spritesheet.png',
		destCss: './frontend/src/scss/base/_sprites.scss'
	}
}