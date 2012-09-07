Ext.define("CumminsApp.controller.SignIn", {

    extend: "Ext.app.Controller",
	
	username: '',
	password: '',
	remember: '',
	
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            signInView: "signInView"
        },
        control: {
            signInView: {
                // The commands fired by the notes list container.
                signInEvent: "onSignInCommand"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions

	// Services
	

    // Commands.
    onSignInCommand: function (e) {

        console.log("onSignInCommand");
		//console.log(CumminsApp.controller.AppNavigator.loading);
		Ext.Viewport.add(CumminsApp.controller.AppNavigator.loading)
		CumminsApp.controller.AppNavigator.loading.hide();
		
		this.username = e.username;
		this.password = e.password;
		this.remember = e.remember;
		
		if (this.username == '')	{
			Ext.Msg.alert('Empty username', 'Please type username', Ext.emptyFn);
			return;
		}	
		
		if (this.password == '') {
			Ext.Msg.alert('Empty password', 'Please type password', Ext.emptyFn);
			return;
		}
		
		CumminsApp.controller.AppNavigator.loading.show();
						
		var paramsOfService = {
			
			rest_data: JSON.stringify(this.password),	
			username: this.username
		};
		
		console.log(paramsOfService.rest_data);
		
		// start call login service
		var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceMD5(paramsOfService, this);
		
		
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var notesStore = Ext.getStore("Notes");
        //notesStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init sign in controller");
    },
	
	// Delegate Class functions
	loginSuccessDelegate: function(response) {
		var result = JSON.parse(response.responseText);
		var sessionId = result['id'];
		if (sessionId != undefined) {			
			
			// after login success, set user data to model
			var singletonUserTechnician = CumminsApp.model.UserTechnician;
			var name_value_list = result.name_value_list;
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.ID, sessionId);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.MODULE_NAME, result['module_name']);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.USER_ID, name_value_list.user_id['value']);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.USER_NAME, name_value_list.user_name['value']);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.USER_LANGUAGE, name_value_list.user_language['value']);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.USER_CURRENCY_ID, name_value_list.user_currency_id['value']);
			singletonUserTechnician.set(CumminsApp.model.UserTechnician.USER_CURRENCY_NAME, name_value_list.user_currency_name['value']);
			
			// remember username and password to localStorage
			localStorage.setItem("CumminsUsername", this.username);
			localStorage.setItem("CumminsPassword", this.password);
			localStorage.setItem("CumminsRemember", this.remember);
			
			// start call login service
			var servicesInstance = CumminsApp.controller.Services;
			servicesInstance.callServiceGetRoleTechnicianId(sessionId, this);
			
		} else { // login fail
			Ext.Msg.show({
							title: CumminsApp.model.Localizable.LOGIN_FAIL,
							message: CumminsApp.model.Localizable.LOGIN_FAIL_MESSAGE,
							buttons: [
								{ text: CumminsApp.model.Localizable.OK }
							],
							fn: Ext.emptyFn,
							scope: this
						});
			
			// hide loading
			CumminsApp.controller.AppNavigator.loading.hide();
		}
	}
});