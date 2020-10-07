let FS = require('fs');
class BuildFiles {
    constructor() {
        this.fs = require('fs');
    }

    /**
     * @param {Array} myDate The array
     * @param {string} dist The string
    */
    js($files, $dist = 'public/assets/js/app.js') {
        this.fs.unlink($dist, function (err) {
            //if (err) throw err;
            for (var i = 0; i < $files.length; i++) {
                console.log('\x1b[33mBuilding File '+$files[i]+'\x1b[0m');
                var name = $files[i];

                FS.readFile($files[i], 'utf8', function(err, contents) {
                    if (err) throw err;
                    contents = '// File name: '+name+'\n'+contents;
                    FS.appendFile($dist, contents, function (err) {
                        if (err) throw err;
                        console.log('\x1b[32mSaved File '+name+'\x1b[0m');
                    }); 
                });

            }
        });

        //console.log($files);
    }
    /**
     * @param {Array} myDate The array
     * @param {string} dist The string
    */
    css($files, $dist = 'public/assets/css/style.css') {
        this.fs.unlink($dist, function (err) {
            //if (err) throw err;
            for (var i = 0; i < $files.length; i++) {
                console.log('\x1b[33mBuilding File '+$files[i]+'\x1b[0m');
                var name = $files[i];

                FS.readFile($files[i], 'utf8', function(err, contents) {
                    if (err) throw err;
                    contents = '/* File name: '+name+'\n'+contents+' */';
                    FS.appendFile($dist, contents, function (err) {
                        if (err) throw err;
                        console.log('\x1b[32mSaved File '+name+'\x1b[0m');
                    }); 
                });

            }
        });
    }
}
module.exports = BuildFiles;