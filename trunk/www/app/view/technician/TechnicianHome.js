Ext.define("CumminsApp.view.technician.TechnicianHome", {
    extend: "Ext.Container",
    alias: "widget.technicianHomeView",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: "toolbar",
            docked: "top",
			itemId: "toolbar",
            items: [
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
			docked: 'top',
			xtype: 'toolbar',
			items: [{
				xtype: 'searchfield',
				placeHolder: CumminsApp.model.Localizable.SEARCH,
				width: '95%',
				name: 'searchfield',
					listeners: {
					keyup: function(field){
						var value = field.getValue();
						
						var store = Ext.getStore('Jobs');
						if (value) {
							
							var searches = value.split(' '),
							regexps  = [],
							i;
                                             
							for (i = 0; i < searches.length; i++) {
								if (!searches[i]) return;
									regexps.push(new RegExp(searches[i], 'i'));
								};
                                             
								store.filterBy(function(record) {
									var matched = [];
                                                            
									for (i = 0; i < regexps.length; i++) {
										var search = regexps[i];
                                                            
										if (record.get('jobName').match(search)) 
											matched.push(true);
										else
											matched.push(false);
									};
                                                            
									if (regexps.length > 1 && matched.indexOf(false) != -1) {
										return false;
									} else {
										return matched[0];
									}
							});
						} else {
							store.clearFilter();
						}
					},
					clearicontap: function() {
						var store = Ext.getStore('Jobs');
						store.clearFilter();
					}
				}
			}]
			
		},
		{
			xtype: 'list',
			grouped: true,
			onItemDisclosure: true,
			plugins: [{
				xclass: 'Ext.plugin.PullRefresh',
				refreshFn: function(plugin) {
					//console.log("I'm pulled");
					var technicianHomeView = this.parent.parent;
					technicianHomeView.fireEvent('pullrefreshEvent');
				}
			}/*,{
				xclass: 'Ext.plugin.ListPaging',
				autoPaging: true
			}*/],
			itemTpl: new Ext.XTemplate(
						"<tpl if='job_status_c == \"open\" ' >",
							"<img class='list-item-img' src='resources/image/job_open.png' width='38' height='38' />",
						"<tpl elseif='job_status_c == \"working\" '>",
							"<img class='list-item-img' src='resources/image/job_working.png' width='38' height='38' />",
						"<tpl else>",
							"<img class='list-item-img' src='resources/image/job_conplete.png' width='38' height='38' />",
						"</tpl>",
						"<div class='list-item-title'>{jobName}</div>",
						"<div class='list-item-time'>{time}</div>"
					),
			itemId: 'jobNameList',
			store: 'Jobs'
		}],
        listeners: [{
            delegate: "#signOutButton",
            event: "tap",
            fn: "onSignOutButtonTap"
        }, {
            delegate: "#jobNameList",
            event: "itemtap",
            fn: "onTapJobNameItem"
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
    onTapJobNameItem: function  (list, index, item, record)  {
        console.log("onTopJobNameItem");
        this.fireEvent('tapJobNameItemEvent', { record: record });
    }
});