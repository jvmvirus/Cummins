Ext.define("CumminsApp.view.SignIn", {
    extend: "Ext.Container",
    requires: ["CumminsApp.model.Localizable"],
    alias: "widget.signInView",
	
    config: {
        layout: {
            type: 'fit'
        },
        items: [
				{	xtype: "segmentedbutton",
					//hidden: true,
					allowDepress: true,
					top: '5px',
					right: '5%',
					itemId: "segmentedButton",
					items: [{
						xtype: "button",
						padding: 0,
						icon: 'resources/image/usa-flag-icon.png',
						itemId: 'usaButton'
					},{
						xtype: "button",
						icon: 'resources/image/vietnam-flag-icon.png',						
						padding: 0,
						itemId: 'vietnamButton'
					}]
				},
				{ xtype: "fieldset",
					title: CumminsApp.model.Localizable.USERNAME,
					height: '100px',
					width: '90%',
					top: '50px',
					left: '5%',
					itemId: 'usernameFS',
					items: [
						{
							xtype: 'textfield',
							name: 'username',
							itemId: 'username',
							required: true
						}						
					]
				},
				{ xtype: "fieldset",
					title: CumminsApp.model.Localizable.PASSWORD,
					height: '100px',
					width: '90%',
					left: '5%',
					top: '150px',
					itemId: 'passwordFS',
					items: [
						{
							xtype: 'passwordfield',
							name: 'password',
							itemId: 'password',
							required: true
						}
					]
				},
				{ xtype: "fieldset",
					height: '50px',
					width: '90%',
					left: '5%',
					top: '270px',
					itemId: 'rememberFS',
					items: [
						{
							xtype: 'checkboxfield',
							name: 'remember',
							label: CumminsApp.model.Localizable.REMEMBER,
							itemId: 'remember',
							labelWidth: '40%'
						}
					]
				},
				{
					xtype: "button",
					text: CumminsApp.model.Localizable.SIGNIN,
					ui: 'round',
					top: '350px',
					width: '50%',
					height: '45px',
					left: '25%',
					itemId: "signInButton"
				}
			
		],
        listeners: [{
            delegate: "#signInButton",
            event: "tap",
            fn: "onSignInButtonTap"
        },{
            delegate: "#usaButton",
            event: "tap",
            fn: "onUsaButtonTap"
        },{
            delegate: "#vietnamButton",
            event: "tap",
            fn: "onVietnamButtonTap"
        }]
    },    
    onSignInButtonTap: function () {
        console.log("signInEvent");
		var usernameTF = this.getComponent('usernameFS').getComponent('username');
		var passwordTF = this.getComponent('passwordFS').getComponent('password');
		var rememberCB = this.getComponent('rememberFS').getComponent('remember');
        this.fireEvent('signInEvent', { username: usernameTF.getValue(), 
										password: passwordTF.getValue(),  
										remember: rememberCB.isChecked() 
									});
    },
	onUsaButtonTap: function () {
		var segmentedButton = this.getComponent('segmentedButton');
		segmentedButton.setPressedButtons(segmentedButton.getComponent('usaButton') );
		
		localStorage.setItem("CumminsLanguage", CumminsApp.model.Localizable.LANGUAGE.ENGLISH);
		
		LoadingPlugin.showLoading(
		  [],
		  function(result) {
			   //alert("Hiding Success: \r\n"+result);
		  },
		  function(error) {
			   //alert("Error: \r\n"+error);
		  }
		);
		
		window.location.reload();
    },
	onVietnamButtonTap: function () {
		var segmentedButton = this.getComponent('segmentedButton');
		segmentedButton.setPressedButtons(segmentedButton.getComponent('vietnamButton') );
		
		localStorage.setItem("CumminsLanguage", CumminsApp.model.Localizable.LANGUAGE.VIETNAMESE);
		
		LoadingPlugin.showLoading(
		  [],
		  function(result) {
			   //alert("Hiding Success: \r\n"+result);
		  },
		  function(error) {
			   //alert("Error: \r\n"+error);
		  }
		);

		window.location.reload();
    },
	
	constructor: function() {
		console.log('sign view  constructor');
		this.callParent();
	
		
	},
	
	initialize: function() {
		console.log('initialize sign in view');
		
		var remember = localStorage.getItem("CumminsRemember");
				
		if (remember == 'true') {
			
			Ext.ComponentQuery.query('#remember')[0].setChecked(true);
			
			var username = localStorage.getItem("CumminsUsername");
			var password = localStorage.getItem("CumminsPassword");
			
			if (username != null && password != null) {
				Ext.ComponentQuery.query('#username')[0].setValue(username);
				Ext.ComponentQuery.query('#password')[0].setValue(password);
			}
			
		}
		
		// reset pressed button
		var segmentedButton = this.getComponent('segmentedButton');
		segmentedButton.setPressedButtons([]);
		var languageName = localStorage.getItem("CumminsLanguage");
		if (languageName == null || languageName == CumminsApp.model.Localizable.LANGUAGE.ENGLISH) { // default language is English
			segmentedButton.setPressedButtons(segmentedButton.getComponent('usaButton') );
		} else if (languageName == CumminsApp.model.Localizable.LANGUAGE.VIETNAMESE) {
			segmentedButton.setPressedButtons(segmentedButton.getComponent('vietnamButton') );
		}
		
		this.callParent();
	}
});