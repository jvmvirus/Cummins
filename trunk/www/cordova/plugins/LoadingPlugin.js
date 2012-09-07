/**
 * LoadingPlugin.js
 *  
 * Phonegap MyPlugin Instance plugin
 * Copyright (c) Nimish Nayak 2011
 *
 */
var LoadingPlugin = {
     nativeFunction: function(types, success, fail) {
		 if (Cordova.exec != undefined)
			return Cordova.exec(success, fail, "LoadingPlugin", "print", types);
		 else
			return null;
     },
	 hideLoading: function(types, success, fail) {
		 if (Cordova.exec != undefined)
			return Cordova.exec(success, fail, "LoadingPlugin", "hideLoading", types);
		 else
			return null;
     },
	  showLoading: function(types, success, fail) {
		 if (Cordova.exec != undefined)
			return Cordova.exec(success, fail, "LoadingPlugin", "showLoading", types);
		 else
			return null;
     }
};