/**
 * LoadingPlugin.js
 *  
 * Phonegap MyPlugin Instance plugin
 * Copyright (c) Nimish Nayak 2011
 *
 */
var ChildBrowser = {
	 showWebPage: function(types, success, fail) {
		 if (Cordova.exec != undefined)
			return Cordova.exec(success, fail, "ChildBrowserCommand", "showWebPage", types);
		 else
			return null;
     }
};