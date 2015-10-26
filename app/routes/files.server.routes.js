'use strict';

module.exports = function(app) {

    var files = require('../../app/controllers/files.server.controller');
    var users = require('../../app/controllers/users.server.controller');
    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/data/'});
    var multipleUpload = upload.array('files');
    var fs = require('fs');

	// Routing logic
    app.route('/files').get(users.requiresLogin, files.list);
    app.get('/files/dirs', users.requiresLogin, files.getFolders);
    app.get('/files/upload', users.requiresLogin, function (req, res) {
    })
    .post('/files/upload', users.requiresLogin, multipleUpload, function (req, res) {
        var folder = (req.body.folderName !== '') ? req.body.folderName : (req.body.selectedFolder === 'root') ? '' : req.body.selectedFolder;
        var path = __dirname + '/../../public/data/' + folder + '/';
        console.log('Path :', path);

        if (req.body.folderName !== '') {
            createFolder(path);
        }

        req.files.forEach(function (file) {
            var tmp_path = file.path;
            var target_path = path + file.originalname;
            console.log('tmp : ', tmp_path)
            console.log('target :', target_path);
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                fs.unlink(tmp_path, function() {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
        res.redirect(200, '/files');
    });

    function createFolder(name) {
        fs.mkdir(name, '777', function(err) {
            if (err) {
                if (err.code === 'EEXISTS') {
                    return;
                } else {
                    console.log(err);
                    throw err;
                }
            }
        });
        console.log('folder created');
    }
};
