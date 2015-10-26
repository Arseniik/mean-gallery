'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('../controllers/errors.server.controller'),
    User = mongoose.model('User');

/**
 * Show the current User
 */
exports.read = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }

    User.findById(id).exec(function(err, user) {
        if (err) return next(err);
        if (!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        res.json(user);
        next();
    });
};

/**
 * Update a User
 */
exports.update = function (req, res) {
    var user = req.profile;
    user = _.extend(user, req.body);

    user.update(function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });

    console.log('Updated user :');
    console.log(user);
    res.json(user);
};

/**
 * Delete a User
 */
exports.delete = function (req, res) {
    var user = req.profile;
    User.find({_id: user._id}).remove(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });

    console.log('DELETED user :');
    console.log(user);
};

/**
 * List of Users
 */
exports.list = function (req, res) {
    User.find().exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(users);
        }
    });
};
