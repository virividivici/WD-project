module.exports = {
	dist: {
		src: '<%= sguide %>/styleguide.html',
		dest: '<%= meta.application.docrootFolder %>/',
		options: {
			beautify: true,
			relative: true,
			sections: {
				bundle: '<%= sgBundle %>',
				basicelements: '<%= sguide %>/partials/basicelements/*.html',
				bootstrapui: '<%= sguide %>/partials/bootstrapui/*.html',
				views: '<%= sguide %>/partials/views/*.html',
				layout: {
					footer: '<%= sguide %>/partials/layout-footer.html'
				}
			}
		}
	}
}