let fileBuild = new (require('./BuildFiles')) ();
fileBuild.css([
	'node_modules/bootstrap/dist/css/bootstrap.css',
]);
fileBuild.js([
	'node_modules/bootstrap/dist/js/bootstrap.js',
]);