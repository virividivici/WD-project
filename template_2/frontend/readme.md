Front End Setup
===============

Requirements:
-------------

### NodeJS

Install from [http://nodejs.org](nodejs.org).


### Grunt

Install the Grunt command-line tool if you don't have it using:

	npm install -g grunt-cli

To install the modules needed to build the project, run:

  npm install -g grunt-cli


### Ruby - Windows only

Install the 2.1.x version of Ruby using the installer from [http://rubyinstaller.org/download](rubyinstaller.org).


### SASS, Compass and Twitter Bootstrap:

	gem install sass compass bootstrap-sass


### Maven - OS X
(requires homebrew to be installed)

	brew install maven


### Maven - Windows

Download the Maven binaries from [https://maven.apache.org/download.cgi](maven.apache.org) and extract the files into a folder on your hard drive e.g. `C:\dev\apps\apache-maven-3.3.3`. Instructions for setting it up can be found in the `README.txt` file in that directory.


### Java - OS X

Requires JRE 1.7 - follow these instructions for OSX:

[http://stackoverflow.com/a/19737307](http://stackoverflow.com/a/19737307)

Add the following to your .bash_profile

	export MAVEN_OPTS="-XX:PermSize=256M -XX:MaxPermSize=512M -Xmx1024m"

### Java - Windows

Add a new environment variable called `MAVEN_OPTS` with the value `-XX:PermSize=256M -XX:MaxPermSize=512M -Xmx1024m`.


Running the project
-------------------

### Rebuild the project

	cd path/to/project/SaaS-Platform

	mvn clean install


### Run the server

	path/to/project/SaaS-Platform/saas-platform-webapp

	mvn jetty:run


Forms
------

Form styling and functionality has been added to using Angular JS.

Ensure that the page containing forms has an `ng-controller` added to it somewhere.
e.g. `ng-controller="provisioningCtrl"`. Typically this would be a div inside which the rest of the page content and any forms are included.

This will ensure that validation works and fields are populated correctly.

See the /docroot/style-guide.html or provisioning templates for more form examples.


###Fields

To help with styling and re-use we've created custom form fields for input boxes and select drop downs.

These should generally replace any standard &lt;input&gt; tags, [@form.input /] tags, &lt;select&gt; elements and [@form.select /].


###Inputs

	<form-field field-path="[java_field_path]" form-type="[field_type]" input-fields="[angular_model_field_name]" field-name="[field_name]" field-title="[field_title]" field-required="[is_required?]" field-value="[prepopulated_value]"></form-field>

| Attribute          	| Description                                  | Value(s)  |
| ------------------ 	| -------------------------------------------- | --------- |
|  `field-path`      	|  the `path` value from a standard spring/form field  |         |
|  `form-type`       	|  field type  |   `text`, `email`, `password`  |
|  `input-fields`		|  field reference in the angular model - should match the path  |    |
|  `field-name`      	|  name of input  |    |
|  `field-title`     	|  Title text which appears in label above field   |    |
|  `field-required`  	|  Set whether field is required to submit form   |  `required`,`false`  |
|  `field-value`     	|  Set initial value of the field - this is likely to come from the data in the backend, output within freemarker tags   |  `${some_data_field}`  |


####Examples


##### First Name

	<form-field field-path="user.account.firstName" form-type="text" input-fields="user.firstName" field-name="firstName" field-title="First Name" field-required="required"></form-field>


##### Email address

	<form-field field-path="user.email" input-fields="user.email" form-type="email" field-name="email" field-title="Customer's email address" field-value="test" field-required="required"></form-field>


###Selects

	<form-select field-path="[java_field_path]" form-type="select" input-fields="[angular_model_field_name]" field-name="[field_name]" field-title="[field_title]" field-required="required" field-value="[prepopulated_value]">
		<option value="Manager 1">Manager 1</option>
        <option value="Manager 2">Manager 2</option>
	</form-select>

| Attribute          	| Description                                  | Value(s)  |
| ------------------ 	| -------------------------------------------- | --------- |
|  `field-path`      	|  the `path` value from a standard spring/form field  |         |
|  `form-type`       	|  field type  |   `text`, `email`, `password`  |
|  `input-fields`		|  field reference in the angular model - should match the path  |    |
|  `field-name`      	|  name of input  |    |
|  `field-title`     	|  Title text which appears in label above field   |    |
|  `field-required`  	|  Set whether field is required to submit form   |  `required`,`false`  |
|  `field-value`     	|  Set initial value of the field - this is likely to come from the data in the backend, output within freemarker tags. It should match the `value` of one of the `<option>` elements    |  `${some_data_field}`  |


####Examples


##### Select a Manager
Using hardcoded &lt;option&gt; elements

	<form-select field-path="user.account.manager" form-type="select" input-fields="user.account.manager" field-name="manager" field-title="Select manager" field-required="required">
		<option value="Manager 1">Manager 1</option>
        <option value="Manager 2">Manager 2</option>
	</form-select>


##### Account Type
Using [#list] to build &lt;option&gt; list

	<form-select field-path="user.account.type" form-type="select" input-fields="user.account.type" field-name="type" field-title="Business Type" field-required="true" field-value="${user.account.type}">
		[#list type?keys as item]
			<option value="${item}">${item}</option>
		[/#list]
	</form-select>
