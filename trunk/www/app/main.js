LANGUAGE = {
	ENGLISH: 'English',
	VIETNAMESE: 'Vietnamese'
};

var main = function() {
	var languageName = localStorage.getItem("CumminsLanguage");
	if (languageName == 'undefined') {// default language is English
		localStorage.setItem("CumminsLanguage", LANGUAGE.ENGLISH);
		languageName = LANGUAGE.ENGLISH;
	}
	
	var head = document.getElementsByTagName('head')[0];

	var localizableScript = document.createElement('script');
	localizableScript.setAttribute("type", "text/javascript");

	// now we only support English and Vietnamese
	switch (languageName) {
		case LANGUAGE.ENGLISH:
			localizableScript.setAttribute("src", "resources/language/english/Localizable.js");
		break;
		case LANGUAGE.VIETNAMESE:
			localizableScript.setAttribute("src", "resources/language/vietnamese/Localizable.js");
		break;
	}

	localizableScript.onload = startApp;
	
	head.appendChild(localizableScript);
}

var startApp = function() {
	var appScript = document.createElement('script');
	appScript.setAttribute("type", "text/javascript");
	appScript.setAttribute("src", "app/app.js");
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(appScript);
}

main();