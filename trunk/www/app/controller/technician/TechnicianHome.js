Ext.define("CumminsApp.controller.technician.TechnicianHome", {

    extend: "Ext.app.Controller",
	
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            technicianHomeView: "technicianHomeView"
        },
        control: {
            technicianHomeView: {
                // The commands fired by the technician home view.
                signOutEvent: "onSignOutCommand",
				tapJobNameItemEvent: "onTapJobNameItemCommand",
				getJobsDataEvent: "onInitTechnicianHomeCommand",
				pullrefreshEvent: "onPullRefreshCommand"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    setToolBarTitle: function() {
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var technicianHomeView = this.getTechnicianHomeView();
		var toolbar = technicianHomeView.getComponent('toolbar');
		//toolbar.setTitle('Hi, ' + singletonUserTechnician.get(CumminsApp.model.UserTechnician.USER_NAME) );
	},
	onLoadListJobsCompleteHandler: function() {
		console.log("onLoadListJobsCompleteHandler");
		//var servicesInstance = CumminsApp.controller.Services;
		//servicesInstance.callServiceSetRelationshipJobAndDocument();
		
	},
	
    // Commands.
    onSignOutCommand: function () {

        console.log("onSignOutCommand");
		
		var technicianHomeView = this.getTechnicianHomeView();
		technicianHomeView.fireEvent('signOutSuccessEvent', this );
		
    },
	onTapJobNameItemCommand: function(event) {
		console.log("onTapJobNameItemCommand");

		var record = event.record;
		var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceJobDetail(record.data.id, this);
	},
	onInitTechnicianHomeCommand: function () {
		console.log("onInitTechnicianHomeCommand");
		
		this.setToolBarTitle();
		
		// start call get list of jobs service
		var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceGetListJobs(this);
	},
	
	onPullRefreshCommand: function() {
		console.log("onPullRefreshCommand");
		var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceGetListJobs(this);
	},
	
	onGetJobDetailSuccessHandler: function( newJobDetail ) {
		var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceAccountDetail(newJobDetail, this);
	},
	
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init technician home controller");
		
    }
});