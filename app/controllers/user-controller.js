/**
 * Created by sridharrajs on 2/3/16.
 */

'use strict';

let mongoose = require('mongoose');
let gravatar = require('nodejs-gravatar');
let wrapper = require('mongoose-callback-wrapper');

let User = mongoose.model('user');

let attributes = require('../models/user').getPublicAttributes();

let add = (item, cb)=> {
	let user = new User({
		emailId: item.emailId,
		password: item.password,
		profile_url: gravatar.imageUrl(item.emailId)
	});
	user.save((err, newDoc) => {
		if (err) {
			return cb(err);
		}
		let user = {
			_id: newDoc._id,
			profile_url: newDoc.profile_url
		};
		cb(null, user);
	});
};

let getUserByEmailId = function (emailId, cb) {
	let wrappedCallback = wrapper.wrap(cb, attributes);
	let query = User.find({
		emailId: emailId
	});
	query.exec(wrappedCallback);
};

let getUserByUserId = function (userId, cb) {
	let wrappedCallback = wrapper.wrap(cb, attributes);
	let query = User.find({
		"_id": mongoose.Types.ObjectId(userId)
	});
	query.exec(wrappedCallback);
};

module.exports = {
	add,
	getUserByEmailId,
	getUserByUserId
};
