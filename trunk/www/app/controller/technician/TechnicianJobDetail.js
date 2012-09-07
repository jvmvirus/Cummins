Ext.define("CumminsApp.controller.technician.TechnicianJobDetail", {

    extend: "Ext.app.Controller",
	
	statics: {
		DEFAULT_LATITUDE	: 10.859,
		DEFAULT_LONGITUDE	: 106.362
	},
	
	trackTimer: null,
	imageDataUpload: null,
    
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            technicianJobDetailView: "technicianJobDetailView"
        },
        control: {
            technicianJobDetailView: {
                // The commands fired by the technician home view.
                signOutEvent: "onSignOutCommand",
				initJobDetailEvent: "onInitJobDetailCommand",
				backEvent: "onBackCommand",
				startJobEvent: "onStartJobCommand",
				endJobEvent: "onEndJobCommand",
				dispatchEvent: "onDispatchCommand",
				returnEvent: "onReturnCommand",
				findDirectEvent: "onFindDirectCommand",
                takeShootEvent: "onTakeShootCommand",
                uploadImageEvent: "onUploadImageCommand"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
	
	directionsService : new google.maps.DirectionsService(),
	directionsDisplay : new google.maps.DirectionsRenderer(),
	accountDetail : null,
	jobDetail: null,

	// Helper functions
	getCurrentDateTime: function() {
		var now = new Date();
		
		// convert js date type to sql date type
		var currentTime = now.getFullYear()
						+ '-'
						+ ("00" + (now.getMonth()+1)).slice(-2)
						+ '-'
						+ ("00" + now.getDate()).slice(-2)
						+ ' '
						+ ("00" + now.getHours()).slice(-2)
						+ ':'
						+ ("00" + now.getMinutes()).slice(-2)
						+ ':'
						+ ("00" + now.getSeconds()).slice(-2);
		return currentTime;				
	},
	
    setToolBarTitle: function() {
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		var toolbar = technicianJobDetailView.getComponent('toolbar');
		//toolbar.setTitle('Hi, ' + singletonUserTechnician.get(CumminsApp.model.UserTechnician.USER_NAME) );
	},
	renderJobDetail: function(jobDetail) {
		// render data to view
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		var formpanelJobDetail = technicianJobDetailView.getComponent('formpanelJobDetail');
		var fieldsetJobDetail = formpanelJobDetail.getComponent('fieldsetJobDetail');
		 
		var jobName = fieldsetJobDetail.getComponent('jobName');
		jobName.setValue(jobDetail.get(CumminsApp.model.JobDetail.NAME));
		
		var type = fieldsetJobDetail.getComponent('type');
		type.setValue(jobDetail.get(CumminsApp.model.JobDetail.TYPE));
		
		var serviceLocation = fieldsetJobDetail.getComponent('serviceLocation');
		serviceLocation.setValue(jobDetail.get(CumminsApp.model.JobDetail.SERVICE_LOCATION_C));
		
		var description = fieldsetJobDetail.getComponent('description');
		description.setValue(jobDetail.get(CumminsApp.model.JobDetail.DESCRIPTION));
		
		var priority = fieldsetJobDetail.getComponent('priority');
		priority.setValue(jobDetail.get(CumminsApp.model.JobDetail.JOB_PRIORITY_C));
		
		var status = fieldsetJobDetail.getComponent('status');
		status.setValue(jobDetail.get(CumminsApp.model.JobDetail.JOB_STATUS_C));
		
		var charge = fieldsetJobDetail.getComponent('charge');
		charge.setValue(jobDetail.get(CumminsApp.model.JobDetail.CHARGE_TYPE_C));
		
		var serviceScheduledFor = fieldsetJobDetail.getComponent('serviceScheduledFor');
		serviceScheduledFor.setValue(jobDetail.get(CumminsApp.model.JobDetail.DATE_START));
		
        
		
	},
	renderAccountDetail: function(accountDetail) {
		// render data to view
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		var formpanelJobDetail = technicianJobDetailView.getComponent('formpanelJobDetail');
		var fieldsetAccountDetail = formpanelJobDetail.getComponent('fieldsetAccountDetail');
		
		var account = fieldsetAccountDetail.getComponent('account');
		account.setValue(accountDetail.get(CumminsApp.model.AccountDetail.NAME));
		
		var officeAddress = fieldsetAccountDetail.getComponent('officeAddress');
		var officeAddressData = accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_ADDRESS_STREET) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_ADDRESS_DISTRICT) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_ADDRESS_CITY) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_ADDRESS_COUNTRY);
		officeAddress.setValue(officeAddressData);
		
		var customerCode = fieldsetAccountDetail.getComponent('customerCode');
		customerCode.setValue(accountDetail.get(CumminsApp.model.AccountDetail.CUSTOMER_CODE_C));
		
		var jobsiteAddress = fieldsetAccountDetail.getComponent('jobsiteAddress');
		var jobsiteAddressData = accountDetail.get(CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_STREET) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_DISTRICT) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_CITY) + ' ' + accountDetail.get(CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_COUNTRY);
		jobsiteAddress.setValue(jobsiteAddressData);
	},
	renderContactDetail: function(accountDetail) {
		// render data to view
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		var formpanelJobDetail = technicianJobDetailView.getComponent('formpanelJobDetail');
		var fieldsetContactDetail = formpanelJobDetail.getComponent('fieldsetContactDetail'); 
		
		var name = fieldsetContactDetail.getComponent('name');
		name.setValue(accountDetail.get(CumminsApp.model.AccountDetail.NAME));
		
		var officePhone = fieldsetContactDetail.getComponent('officePhone');
		officePhone.setValue(accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_PHONE_C));
		
		var webpage = fieldsetContactDetail.getComponent('webpage');
		webpage.setValue(accountDetail.get(CumminsApp.model.AccountDetail.ACCOUNT_URL_C));
		
		var email = fieldsetContactDetail.getComponent('email');
		//email.setValue(accountDetail.get(CumminsApp.model.AccountDetail.EMAIL));
		
		var mobilePhone = fieldsetContactDetail.getComponent('mobilePhone');
		mobilePhone.setValue(accountDetail.get(CumminsApp.model.AccountDetail.MOBILE_PHONE_C));
		
	},
	
	initGooglepMap: function(accountDetail) {
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		var panelMap = technicianJobDetailView.getComponent('panelMap');
		var latitude = accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LATITUDE_C);
		var longitude = accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LONGITUDE_C);
		var map = panelMap.getComponent('mapId');
		map.setMapCenter( { latitude: latitude , longitude: longitude } );
		
		var marker = new google.maps.Marker({
							position: new google.maps.LatLng(/*latitude*/ latitude , /*longitude*/ longitude ),
							title: "Cutomer's address",
							map: map.getMap()
						});
		
									
	},
	
	stopTrackLocation: function() {
		clearTimeout(this.trackTimer);
	},

    // Commands.
    onSignOutCommand: function () {

        console.log("onSignOutCommand");
		
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		technicianJobDetailView.fireEvent('signOutSuccessEvent', this );
		
    },
	onBackCommand: function() {
		console.log("onBackCommand");
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		technicianJobDetailView.fireEvent('showTechnicianHomeEvent', this );
	},
	onStartJobCommand: function() {
		var servicesInstance = CumminsApp.controller.Services;
		
		var currentTime = this.getCurrentDateTime();
		var id = this.jobDetail.get(CumminsApp.model.JobDetail.ID);
		var data = { id: id, currentTime:currentTime  };			
		servicesInstance.callServiceSetStartJobTime(data, this);
	},
	onEndJobCommand: function() {
		var servicesInstance = CumminsApp.controller.Services;
		
		var currentTime = this.getCurrentDateTime();
		var id = this.jobDetail.get(CumminsApp.model.JobDetail.ID);
		var data = { id: id, currentTime:currentTime  };			
		servicesInstance.callServiceSetEndJobTime(data, this);
	},
	
	onDispatchCommand: function () {
		console.log("onDispatchCommand");
		
		// set dispatch time to server
		var servicesInstance = CumminsApp.controller.Services;
		
		var currentTime = this.getCurrentDateTime();
		var id = this.jobDetail.get(CumminsApp.model.JobDetail.ID);
		var data = { id: id, currentTime:currentTime  };			
		servicesInstance.callServiceSetDispatchTime(data, this);
		
		/*
		//console.log('startTrackLocation');
		thisTechnicianJobDetail = this;
		var startTrackLocation = function () {
			var currentTime = (new Date).getTime();
			//Ext.Msg.alert('Timer', currentTime, Ext.emptyFn);
			var servicesInstance = CumminsApp.controller.Services;
			servicesInstance.callServiceSetStartJobTime(currentTime, thisTechnicianJobDetail);
			thisTechnicianJobDetail.trackTimer = setTimeout(startTrackLocation, 10000);
		}
		
		startTrackLocation();
		*/
	},
	onReturnCommand: function () {
		// set dispatch time to server
		var servicesInstance = CumminsApp.controller.Services;
		
		var currentTime = this.getCurrentDateTime();
		var id = this.jobDetail.get(CumminsApp.model.JobDetail.ID);
		var data = { id: id, currentTime:currentTime  };			
		servicesInstance.callServiceSetReturnTime(data, this);
		
	},
	
	onInitJobDetailCommand: function (event) {
		console.log("onInitJobDetailCommand");
		
		this.setToolBarTitle();
		
		// JobDetail model
		this.jobDetail = event.jobDetail;
		this.renderJobDetail(this.jobDetail);
		
		// Account model
		this.accountDetail = event.accountDetail;
		this.renderAccountDetail(this.accountDetail);
		this.renderContactDetail(this.accountDetail);
		
		// init longitude and latitude
		this.initGooglepMap(this.accountDetail);
		
		// reset tabpanel display to jobdetail tabpanel
		var technicianJobDetailView = this.getTechnicianJobDetailView();
		technicianJobDetailView.setActiveItem(0);
	},
	
	showLocation : function(position) {
		console.log('showLocation');
		var currentLatitude = position.coords.latitude;
		var currentLongitude = position.coords.longitude;
		
		var mapEl = Ext.ComponentQuery.query('#mapId')[0];

		var deslatitude = this.accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LATITUDE_C);
		var deslongitude = this.accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LONGITUDE_C);
		
		var request = {
			origin: new google.maps.LatLng(/*latitude*/ currentLatitude , /*longitude*/ currentLongitude ), 
			destination: new google.maps.LatLng(/*latitude*/ deslatitude , /*longitude*/ deslongitude ),
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		
		this.directionsDisplay.setMap(mapEl.getMap());
		var tempDirectionsDisplay = this.directionsDisplay;
		this.directionsService.route(request, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										tempDirectionsDisplay.setDirections(response);
										//mapEl.customerMarker.setMap(null); // clear marker of customer
									}
								});
	},

	 errorHandler : function (err) {
	  if(err.code == 1) {
		alert("Error: Access is denied!");
	  }else if( err.code == 2) {
		alert("Error: Position is unavailable!");
		var mapEl = Ext.ComponentQuery.query('#mapId')[0];

		var deslatitude = this.accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LATITUDE_C);
		var deslongitude = this.accountDetail.get(CumminsApp.model.AccountDetail.OFFICE_LONGITUDE_C);
		
		var request = {
			origin: new google.maps.LatLng(/*latitude*/ CumminsApp.controller.technician.TechnicianJobDetail.DEFAULT_LATITUDE , /*longitude*/ CumminsApp.controller.technician.TechnicianJobDetail.DEFAULT_LONGITUDE),
			destination: new google.maps.LatLng(/*latitude*/ deslatitude , /*longitude*/ deslongitude ),
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		
		this.directionsDisplay.setMap(mapEl.getMap());
		var tempDirectionsDisplay = this.directionsDisplay;
		this.directionsService.route(request, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										tempDirectionsDisplay.setDirections(response);
										//mapEl.customerMarker.setMap(null); // clear marker of customer
									}
								});
	  }
	},

    onFindDirectCommand: function () {
		console.log("onFindDirectCommand");
		thisTechnicianJobDetail = this;
		if(navigator.geolocation){
		  // timeout at 60000 milliseconds (60 seconds)
		  var options = {timeout:60000};
		  navigator.geolocation.getCurrentPosition( function(position) { thisTechnicianJobDetail.showLocation(position) }, 
													function(err) { thisTechnicianJobDetail.errorHandler(err) },
												   options);
	   }else{
		  alert("Sorry, it does not support geolocation!");
	   }
	
	},
    
    onTakeShootCommand: function() {
        var thisTechnicianJobDetail = this;
        navigator.camera.getPicture(
            function(uri) {
                thisTechnicianJobDetail.takeImageComplete(uri);
            },
            function(e) {
                console.log("Error getting picture: " + e);
            },
            { quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.PHOTOLIBRARY
            }
        );
        
    },
    
    takeImageComplete: function(imageData) {
        this.imageDataUpload = imageData;
        var image = Ext.ComponentQuery.query('#uploadImage')[0];
        image.setSrc("data:image/jpeg;base64," + imageData);
    },
    
    onUploadImageCommand: function() {
        var servicesInstance = CumminsApp.controller.Services;
		servicesInstance.callServiceUploadInvoiceImage(this.imageDataUpload, this);
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init technician job detail controller");
    }
});