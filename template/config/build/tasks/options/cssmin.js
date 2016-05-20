module.exports = {
	options: {
		report: 'gzip'
	},
	target: {
		files: {
			'<%= meta.application.docrootFolder %>/css/style.css': [
				'./node_modules/font-awesome/css/font-awesome.css',
				'./.temp/css/style.css'
				
			]
		}
	}
}