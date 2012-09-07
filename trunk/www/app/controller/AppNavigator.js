Ext.define("CumminsApp.controller.AppNavigator", {

    extend: "Ext.app.Controller",
	
	statics: {
		loading: new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."} )
		//geo: new Ext.util.Geolocation()
	},
	
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            signInView: "signInView",
			technicianHomeView: "technicianHomeView",
			technicianJobDetailView: "technicianJobDetailView"
        },
        control: {
            signInView: {
                // The commands fired by sign in view.
                signInSuccessEvent: "onSignInSuccessCommand"
            },
            technicianHomeView: {
                // The commands fired by technician home view.
                signOutSuccessEvent: "onSignOutSuccessCommand",
				showJobDetailEvent: "onShowJobDetailCommand"
            },
			technicianJobDetailView: {
				// The commands fired by technician job detail view.
				signOutSuccessEvent: "onSignOutSuccessCommand",
				showTechnicianHomeEvent: "onBackTechnicianHomeCommand"
			}
			
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    showTechnicianHome: function (transition) {
        var technicianHomeView = this.getTechnicianHomeView();
		technicianHomeView.fireEvent('getJobsDataEvent', technicianHomeView);
        Ext.Viewport.animateActiveItem(technicianHomeView, transition);
    },
	
	showSignIn: function () {
        var signInView = this.getSignInView();
        Ext.Viewport.animateActiveItem(signInView, this.slideRightTransition);
    },
	showTechnicianJobDetail : function (event) {
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		technicianJobDetailView.fireEvent('initJobDetailEvent', event);
		
        Ext.Viewport.animateActiveItem(technicianJobDetailView, this.slideLeftTransition);	
	},

    // Commands.
    onSignInSuccessCommand: function (data) {

        console.log("onSignInSuccessCommand");
		
		if (data.user_role == 'technician') {
			this.showTechnicianHome(this.slideLeftTransition);
		} else {
			console.log('open view supervisor...');
		}
		
		
    },
	onSignOutSuccessCommand: function (data) {
        console.log("onSignOutSuccessCommand");
		this.showSignIn();
		
    },
	onBackTechnicianHomeCommand: function() {
		console.log("onBackTechnicianHomeCommand");
		/*
		var technicianHomeView = this.getTechnicianHomeView();
        Ext.Viewport.animateActiveItem(technicianHomeView, this.slideRightTransition);
		*/
		this.showTechnicianHome(this.slideRightTransition);
	},
	onShowJobDetailCommand: function (event) {
		this.showTechnicianJobDetail(event);
	},
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        //notesStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init app navigator controller");
    }
});