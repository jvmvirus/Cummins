Ext.define("CumminsApp.view.technician.TechnicianJobDetail", {
    extend: "Ext.tab.Panel",
    alias: "widget.technicianJobDetailView",
	
    config: {
		ui: 'light',
		tabBar: {
			layout: {
				pack: 'center'
			},
			docked: 'bottom'	
		},
		activeTab: 0,
		defaults: {
				scrollable: true
		},
			
		items: [
		{
			xtype: "toolbar",
            docked: "top",
			scrollable: false,
			itemId: "toolbar",
            items: [
				{
                    xtype: "button",
                    text: CumminsApp.model.Localizable.BACK,
                    ui: 'back',
                    itemId: "backButton"
                },
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: CumminsApp.model.Localizable.SIGNOUT,
                    ui: 'action',
                    itemId: "signOutButton"
                }
            ]
		},
		{
			xtype: 'formpanel',
			title: CumminsApp.model.Localizable.DETAIL,
			iconCls: 'info',
			itemId: 'formpanelJobDetail',
			items: [{
						xtype: "toolbar",
						docked: "top",
						ui: 'light',
						scrollable: false,
						itemId: 'menuToolbar',
						defaults: {
							iconMask: true,
							ui: 'plain'
						},
						items: [
							{
								iconCls: 'menu-joborder',
								disabled: true,
								itemId: 'jobDetailTab'
							},
							{
								disabled: true
							},
							{
								iconCls: 'menu-account',
								itemId: 'accountDetailTab'
							},
							{
								disabled: true
							},
							{
								iconCls: 'menu-contact',
								itemId: 'contactDetailTab'
							}
						],
						layout: {
							pack: 'center',
							align: 'center'
						}
					},
					/*
					{
						xtype: 'tabpanel',
						itemId: 'tabDetail',
						ui: 'light',
						tabBar: {
							layout: {
								pack: 'center'
							}
						},
						activeTab: 1,
						docked: 'top',
						items: [{
							title: 'Job',
							itemId: 'jobDetailTab'
						},
						{
							title: 'Account',
							itemId: 'accountDetailTab'
						},
						{
							title: 'Contact',
							itemId: 'contactDetailTab'
						}],
						listeners: {
							activeitemchange: function(thisTabPanel, newActiveItem) {
								var formpanelJobDetail = thisTabPanel.parent;
								var fieldsetJobDetail = formpanelJobDetail.getComponent('fieldsetJobDetail');
								var fieldsetAccountDetail = formpanelJobDetail.getComponent('fieldsetAccountDetail');
								var fieldsetContactDetail = formpanelJobDetail.getComponent('fieldsetContactDetail');
								
								fieldsetJobDetail.setHidden(true);
								fieldsetAccountDetail.setHidden(true);
								fieldsetContactDetail.setHidden(true);

								
								switch ( newActiveItem.getItemId() ) {
									case 'jobDetailTab':
										fieldsetJobDetail.setHidden(false);
									break;
									case 'accountDetailTab':
										fieldsetAccountDetail.setHidden(false);
									break;
									case 'contactDetailTab':
										fieldsetContactDetail.setHidden(false);
									break;
								}
							}
						}
					},
					*/
					{
						xtype: "fieldset",
						title: CumminsApp.model.Localizable.JOB_DETAIL,
						itemId: 'fieldsetJobDetail',
						defaults: {
							labelWidth: '37%'
						},
						items: [
							{
								xtype: 'textfield',
								name: 'Name',
								itemId: 'jobName',
								label: CumminsApp.model.Localizable.JOB,
								value: 'Job name',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'Type',
								itemId: 'type',
								label: CumminsApp.model.Localizable.TYPE,
								value: 'Re',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'ServiceLocation',
								itemId: 'serviceLocation',
								label: CumminsApp.model.Localizable.SERVICE_LOCATION,
								value: 'Shop',
								disabled: true
							},
							{
								xtype: 'textareafield',
								name: 'description',
								itemId: 'description',
								label: CumminsApp.model.Localizable.DESCRIPTION,
								value: 'Come',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'priority',
								itemId: 'priority',
								label: CumminsApp.model.Localizable.PRIORITY,
								value: 'Pla',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'status',
								itemId: 'status',
								label: CumminsApp.model.Localizable.STATUS,
								value: 'Op',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'charge',
								itemId: 'charge',
								label: CumminsApp.model.Localizable.CHARGE,
								value: 'warr',
								disabled: true
							},
							{
								xtype: 'textareafield',
								name: 'serviceScheduledFor',
								itemId: 'serviceScheduledFor',
								label: CumminsApp.model.Localizable.DATE_START,
								value: '07/11',
								disabled: true
							}				
						]
					},
					{ xtype: "fieldset",
						title: CumminsApp.model.Localizable.ACCOUNT_DETAIL,
						itemId: 'fieldsetAccountDetail',
						disabled: true,
						hidden: true,
						defaults: {
							labelWidth: '35%'
						},
						items: [
							{
								xtype: 'textfield',
								name: 'account',
								itemId: 'account',
								label: CumminsApp.model.Localizable.ACCOUNT,
								value: '',
								disabled: true
							},
							{
								xtype: 'textareafield',
								name: 'officeAddress',
								itemId: 'officeAddress',
								label: CumminsApp.model.Localizable.OFFICE_ADDRESS,
								value: '',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'customerCode',
								itemId: 'customerCode',
								label: CumminsApp.model.Localizable.CUSTOMER_CODE,
								value: '',
								disabled: true
							},
							{
								xtype: 'textareafield',
								name: 'jobsiteAddress',
								itemId: 'jobsiteAddress',
								label: CumminsApp.model.Localizable.JOBSITE_ADDRESS,
								value: '',
								disabled: true
							}					
						]
					},
					{ xtype: "fieldset",
						title: CumminsApp.model.Localizable.CONTACT_DETAIL,
						itemId: 'fieldsetContactDetail',
						disabled: true,
						hidden: true,
						defaults: {
							labelWidth: '35%'
						},
						items: [
							{
								xtype: 'textfield',
								name: 'name',
								itemId: 'name',
								label: CumminsApp.model.Localizable.NAME,
								value: '',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'officePhone',
								itemId: 'officePhone',
								label: CumminsApp.model.Localizable.PHONE,
								value: '',
								disabled: true
							},
							{
								xtype: 'textareafield',
								name: 'webpage',
								itemId: 'webpage',
								label: CumminsApp.model.Localizable.WEBPAGE,
								value: '',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'email',
								itemId: 'email',
								label: CumminsApp.model.Localizable.EMAIL,
								value: '',
								disabled: true
							},
							{
								xtype: 'textfield',
								name: 'mobilePhone',
								itemId: 'mobilePhone',
								label: CumminsApp.model.Localizable.MOBILE,
								value: '',
								disabled: true
							}					
						]
					}
				]
		},
		{
			xtype: 'panel',
			layout: 'fit',
			title: CumminsApp.model.Localizable.STATUS,
			iconCls: 'time',
			scrollable: false,
			items: [{
						xtype: "button",
						text: CumminsApp.model.Localizable.START,
						ui: 'round',
						top: '100px',
						width: '50%',
						height: '45px',
						left: '25%',
						itemId: "startButton"
					},
					{
						xtype: "button",
						text: CumminsApp.model.Localizable.STOP,
						ui: 'round',
						top: '200px',
						width: '50%',
						height: '45px',
						left: '25%',
						itemId: "stopButton"
					}]
		},
		{
			xtype: 'panel',
			layout: 'fit',
			scrollable: false,
			iconCls: 'compose',
            itemId: 'invoicePanel',
			title: CumminsApp.model.Localizable.SIGNATURE,
			items: [
                    /*
                    {
						xtype: 'panel',
						id: 'imagePanel',
						width: 320,
						height: 100
					},
					{
						xtype: 'panel',
						id: 'signaturePanel',
						html: '<canvas width="' + 320 + '" height="' + 100 + '" style="border:1px solid black;" id="thecanvas"></canvas>',
						plugins: [new simFla.ux.plugins.signaturePad({width: 320, height: 100})]
					},
                    */
                    {
                        xtype: 'image',
                        mode: 'image',
                        width: 213,
                        height: 320,
                        top: 2,
                        left: '17%',
                        src: 'resources/image/camera.png',
                        itemId: "uploadImage"
                    },
					{
						xtype: "button",
						text: 'Take shoot',
						ui: 'small',
						margin: '327 0 0 5%',
						width: '45%',
						height: '25px',
						itemId: "takeShootButton"
					},
					{
						xtype: "button",
						text: 'Upload',
						ui: 'small',
						margin: '327 0 0 51%',
						width: '45%',
						height: '25px',
						itemId: "uploadButton"
					}				
			],
		},
		{
			xtype: 'panel',
			layout: 'fit',
			scrollable: false,
			title: CumminsApp.model.Localizable.MAP,
			iconCls: 'globe2',
			itemId: 'panelMap',
			items: [{
				xtype: 'map',
				itemId: 'mapId',
				mapOptions: {
					zoom: 16,
					center: new google.maps.LatLng(/*latitude*/ 10.759 , /*longitude*/ 106.662 )
				}
			},
			{
				xtype: "button",
				text: CumminsApp.model.Localizable.DIRECT_TO_HERE,
				ui: 'small',
				top: '320px',
				width: '50%',
				height: '25px',
				left: '25%',
				itemId: "directionButton"
			}]
		}],
		listeners: [{
            delegate: "#backButton",
            event: "tap",
            fn: "onBackButtonTap"
        }, {
            delegate: "#signOutButton",
            event: "tap",
            fn: "onSignOutButtonTap"
        }, {
            delegate: "#startButton",
            event: "tap",
            fn: "onStartButtonTap"
        }, {
            delegate: "#stopButton",
            event: "tap",
            fn: "onStopButtonTap"
        }, {
            delegate: "#directionButton",
            event: "tap",
            fn: "onDirectionButtonTap"
        },{
            delegate: "#jobDetailTab",
            event: "tap",
            fn: "onTopMenuTabTap"
        },{
            delegate: "#accountDetailTab",
            event: "tap",
            fn: "onTopMenuTabTap"
        },{
            delegate: "#contactDetailTab",
            event: "tap",
            fn: "onTopMenuTabTap"
        }, {
            delegate: "#takeShootButton",
            event: "tap",
            fn: "onTakeShootButtonTap"
        }, {
            delegate: "#uploadButton",
            event: "tap",
            fn: "onUploadImageButtonTap"
        }]
    },    
    onSignOutButtonTap: function () {
        console.log("onSignOutButtonTap");
		var thisView = this;
		Ext.Msg.show({
							title: CumminsApp.model.Localizable.SIGNOUT,
							message: CumminsApp.model.Localizable.SIGNOUT_MESSAGE,
							buttons: [
								{ text: CumminsApp.model.Localizable.NO },
								{ text: CumminsApp.model.Localizable.YES }
							],
							fn: function(buttonId) {
									//console.log(buttonId);
									if (buttonId == CumminsApp.model.Localizable.YES) 
										thisView.fireEvent('signOutEvent'); 
							},
							scope: this
						});
    },
	onTopMenuTabTap: function (event) {
		var formpanelJobDetail = this.getComponent('formpanelJobDetail');
		var fieldsetJobDetail = formpanelJobDetail.getComponent('fieldsetJobDetail');
		var fieldsetAccountDetail = formpanelJobDetail.getComponent('fieldsetAccountDetail');
		var fieldsetContactDetail = formpanelJobDetail.getComponent('fieldsetContactDetail');		
		fieldsetJobDetail.setHidden(true);
		fieldsetAccountDetail.setHidden(true);
		fieldsetContactDetail.setHidden(true);
		
		var menuToolbar = formpanelJobDetail.getComponent('menuToolbar');
		var jobDetailTab = menuToolbar.getComponent('jobDetailTab');
		var accountDetailTab = menuToolbar.getComponent('accountDetailTab');
		var contactDetailTab = menuToolbar.getComponent('contactDetailTab');
		jobDetailTab.setDisabled(false);
		accountDetailTab.setDisabled(false);
		contactDetailTab.setDisabled(false);
		
		switch (  event.getItemId() ) {
			case 'jobDetailTab':
				fieldsetJobDetail.setHidden(false);
				jobDetailTab.setDisabled(true);
			break;
			case 'accountDetailTab':
				fieldsetAccountDetail.setHidden(false);
				accountDetailTab.setDisabled(true);
			break;
			case 'contactDetailTab':
				fieldsetContactDetail.setHidden(false);
				contactDetailTab.setDisabled(true);
			break;
		}
		
	},
			
	onStartButtonTap: function () {
        console.log("onStartButtonTap");
		if(!this.actionsStart) {
			this.actionsStart = Ext.Viewport.add({
				xtype: 'actionsheet',
				items: [{
					text: CumminsApp.model.Localizable.START_JOB,
					scope: this,
					handler: function() {
						this.fireEvent('startJobEvent');
						this.actionsStart.hide();
					}
				},
				{
					text: CumminsApp.model.Localizable.DISPATCH,
					scope: this,
					handler: function() {
						this.fireEvent('dispatchEvent');
						this.actionsStart.hide();
					}
				},
				{
					text: CumminsApp.model.Localizable.CANCEL,
					scope: this,
					handler: function() {
						this.actionsStart.hide();
					}
				}]
			})	
		}
		
		this.actionsStart.show();
    },
	onStopButtonTap: function () {
        console.log("onStopButtonTap");
		if(!this.actionsStop) {
			this.actionsStop = Ext.Viewport.add({
				xtype: 'actionsheet',
				items: [{
					text: CumminsApp.model.Localizable.END_JOB,
					scope: this,
					handler: function() {
						this.fireEvent('endJobEvent');
						this.actionsStop.hide();
					}
				},
				{
					text: CumminsApp.model.Localizable.RETURN,
					scope: this,
					handler: function() {
						this.fireEvent('returnEvent');
						this.actionsStop.hide();
					}
				},
				{
					text: CumminsApp.model.Localizable.CANCEL,
					scope: this,
					handler: function() {
						this.actionsStop.hide();
						
					}
				}]
			})	
		}
		
		this.actionsStop.show();
    },
	onBackButtonTap: function () {
        console.log("onBackButtonTap");
        this.fireEvent('backEvent', this);
    },
	onDirectionButtonTap: function () {
        console.log("onDirectionButtonTap");
		this.fireEvent('findDirectEvent');
		
    },
	onTakeShootButtonTap: function () {
		this.fireEvent('takeShootEvent');
    },
	onUploadImageButtonTap: function () {
        this.fireEvent('uploadImageEvent');
    },
	initialize: function() {
		console.log('initialize job detail view');
		
		this.callParent();
	},
	
	
});