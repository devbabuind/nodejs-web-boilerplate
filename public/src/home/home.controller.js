'use strict';

angular
	.module('myApp')
	.controller('HomeCtrl', HomeCtrl);

function HomeCtrl(Auth, $state, profile) {
	var self = this;
	self.logout = logout;
	self.profile = profile;

	function logout() {
		Auth.logout();
	}
}
