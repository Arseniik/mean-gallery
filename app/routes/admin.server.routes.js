'use strict';

    module.exports = function(app) {

    var admin = require('../controllers/admin.server.controller');
    var users = require('../controllers/users.server.controller');

    app.route('/admin/users')
        .get(users.hasAuthorization(['admin']), admin.list);

    app.get('/admin/users/:userId', users.hasAuthorization(['admin']), admin.read);
    app.put('/admin/users/:userId', users.hasAuthorization(['admin']), admin.update);
    app.delete('/admin/users/:userId', users.hasAuthorization(['admin']), admin.delete);


    app.param('userId', admin.read);
};
