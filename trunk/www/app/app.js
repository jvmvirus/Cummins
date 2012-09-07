

Ext.application({
    name: "CumminsApp",
	
	models: [	"Job",
				"JobDetail",
				"AccountDetail",
				"UserTechnician",
	],
	
    stores: [	"Jobs",
				"JobDetails",
				"AccountDetails"
	],
	
    controllers: [	"AppNavigator", 
					"Services",
					"SignIn", 
					"technician.TechnicianHome",
					"technician.TechnicianJobDetail"
					
				],
				
    views: ["SignIn", 
			"technician.TechnicianHome", 
			"technician.TechnicianJobDetail"
			],
	init: function () {
		console.log('App init');
	},
	
    launch: function () {
		console.log('App launch');
		
		// this loading is used when js can not work, use when reload page
		LoadingPlugin.hideLoading(
		  [],
		  function(result) {},
		  function(error) {}
		); 
		
        var signInView = {
            xtype: "signInView"
        };
		
		var technicianHomeView = {
            xtype: "technicianHomeView"
        };
		
		var technicianJobDetailView = {
			xtype: "technicianJobDetailView"
		}	

        Ext.Viewport.add([signInView, technicianHomeView, technicianJobDetailView]);
		
		
    }
});