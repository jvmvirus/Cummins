Ext.define("CumminsApp.controller.Services", {
	
extend: "Ext.app.Controller",	
	
statics: {
	getRestUrl: function() {
		//return 'http://192.168.50.100/staging/6.5/service/v2/rest.php';
		//return 'http://192.168.50.100/crm/sugardev/service/v2/rest.php';
		return 'http://175.41.150.5/crm/sugardev/service/v2/rest.php';
		//return 'http://192.168.50.169/sugar6.5/service/v2/rest.php';
	},
	
	USER_NAME: 'user_name',
	
	PASSWORD: 'password',
	
	REST_APP: 'Cummins rest',
	
	USER_ROLE: { TECHNICIAN: 'technician', SUPERVISOR: 'supervisor' },
	
	callServiceMD5: function(data, objCall) {
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'md5',
				response_type: 'json',
				rest_data: data.rest_data
				
			},
			
			success: function(response) {
				var md5password = response.responseText;
				var loginData = {
					rest_data: '[{"' + CumminsApp.controller.Services.USER_NAME + '":"' + data.username + '", "' + CumminsApp.controller.Services.PASSWORD + '":'+ md5password +'}, "' + CumminsApp.controller.Services.REST_APP + '"]'
				}
	
				var servicesInstance = CumminsApp.controller.Services;
				servicesInstance.callServiceLogin(loginData, objCall);
			}
		
		})
	},	
	
	callServiceLogin: function(loginData, objCall) {
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'login',
				response_type: 'json',
				rest_data: loginData.rest_data				
			},
			success: function (response) {
				//console.log(response.responseText);
				objCall.loginSuccessDelegate(response);
			}
		})
	},
	
	callServiceAvailableModules: function(sessionId, objCall) {
						
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'get_available_modules',
				response_type: 'json',
				rest_data: '["' + sessionId + '", "all"]'
			},
			success: function (response) {
				console.log(response);
			}
		})
	},
	
	// only use for technician
	callServiceGetRoleUser: function(data, objCall) {
		
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		
		var sessionId = data.sessionId;
		var module_name = 'ACLRoles';
		var module_ids = data.technicianId;
		var link_field_name = 'users';
		var related_module_query = CumminsApp.model.UserTechnician.USER_ID + "='" + singletonUserTechnician.get(CumminsApp.model.UserTechnician.USER_ID) + "'";
		var related_fields = '["id"]';
		var related_module_link_name_to_fields_array = '[]';
		var deleted = 0;

		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'get_relationships',
				response_type: 'json',
				rest_data: '["' + sessionId + '", "' + module_name + '", "' + module_ids + '", "' + link_field_name + '", "' + related_module_query + '", ' + related_fields + ', ' + related_module_link_name_to_fields_array + ', ' + deleted + ']'				
			},
			success: function (response) {
				console.log(response.responseText);
				var result = JSON.parse(response.responseText);
				var result_user_id = result.entry_list[0].id;
				
				// hide loading
				CumminsApp.controller.AppNavigator.loading.hide();
				
				// notify to controllers
				var signInView = objCall.getSignInView();
				signInView.fireEvent('signInSuccessEvent', {user_role: CumminsApp.controller.Services.USER_ROLE.TECHNICIAN } );
				
			}
		})
	},
	
	callServiceGetRoleTechnicianId: function (sessionId, objCall) {
		// get id of technician role
		var module_name = 'ACLRoles';
		var query = "name='Technician'"; 
		var order_by = '';
		var offset = '';
		var select_fields = '';
		var link_name_to_fields_array = '["id"]';
		var max_results = '';
		var deleted = 0;
		var Favorites = false;
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'get_entry_list',
				response_type: 'json',
				rest_data: '["' + sessionId + '", "' + module_name + '", "' + query + '", "' + order_by + '", "' + offset + '", "' + select_fields + '", ' + link_name_to_fields_array + ', "' + max_results + '", ' + deleted + ', ' + Favorites + ']'				
			},
			success: function (response) {
				var result = JSON.parse(response.responseText);
				
				if (result.entry_list.length == 0) {
					console.log("Server empty data");
					return;
				}
				
				var data = { sessionId: sessionId, technicianId: result.entry_list[0].id };
				
				var servicesInstance = CumminsApp.controller.Services;
				servicesInstance.callServiceGetRoleUser(data, objCall);
				
			}
		})

	},
	
	callServiceGetListJobs: function(objCall) {
		
		// show loading		
		CumminsApp.controller.AppNavigator.loading.show();		
		
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		
		var sessionId = singletonUserTechnician.get(CumminsApp.model.UserTechnician.ID);
		var module_name = 'Users';
		var module_ids = singletonUserTechnician.get(CumminsApp.model.UserTechnician.USER_ID);
		var link_field_name = 'cdvjoborders_users';
		var related_module_query = "";
		var related_fields = '["id","name","date_start", "job_status_c"]';
		var related_module_link_name_to_fields_array = '[]';
		var deleted = 0;
		console.log(sessionId);
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'get_relationships',
				response_type: 'json',
				rest_data: '["' + sessionId + '", "' + module_name + '", "' + module_ids + '", "' + link_field_name + '", "' + related_module_query + '", ' + related_fields + ', ' + related_module_link_name_to_fields_array + ', ' + deleted + ']'
			},
			success: function (response) {
			  try {
				console.log(response.responseText);
				var result = JSON.parse(response.responseText);
				
				var jobsStore = Ext.getStore("Jobs");
				var listJobs = result.entry_list;
				for (var i = 0; i < listJobs.length; i++) {
					var oneJob = listJobs[i].name_value_list;
											
					var newJob = Ext.create("CumminsApp.model.Job", {
						id						: oneJob[CumminsApp.model.Job.ID]['value'],
						date_start				: oneJob[CumminsApp.model.Job.DATE_START]['value'],
						job_status_c			: oneJob[CumminsApp.model.Job.JOB_STATUS_C]['value'], 
						jobName					: oneJob[CumminsApp.model.Job.NAME]['value']
					});
											
					var jobDate = newJob.get(CumminsApp.model.Job.DATE_START);
					var now = new Date();
					var value;
					
					// if job is completed and is not today, don't add to list
					if (oneJob.job_status_c['value'] == 'complete' && !(jobDate.getDate() == now.getDate() && jobDate.getMonth() == now.getMonth() && jobDate.getFullYear() == now.getFullYear()) )
						continue;
					
					if (jobDate.getDate() == now.getDate() && jobDate.getMonth() == now.getMonth() && jobDate.getFullYear() == now.getFullYear()) {
						value = CumminsApp.model.Localizable.TODAY + ' '
										+ ("00" + jobDate.getHours()).slice(-2)
										+ ':' 
										+ ("00" + jobDate.getMinutes()).slice(-2) ;
					} else if (jobDate.getDate() == now.getDate()+1 && jobDate.getMonth() == now.getMonth() && jobDate.getFullYear() == now.getFullYear()) {
						value = CumminsApp.model.Localizable.TOMORROW + ' '
											+ ("00" + jobDate.getHours()).slice(-2)
											+ ':' 
											+ ("00" + jobDate.getMinutes()).slice(-2) ;
					} else {
						value =			("00" + jobDate.getDate()).slice(-2)
										+ '/'
										+ ("00" + (jobDate.getMonth()+1)).slice(-2)
										+ '/'
										+ jobDate.getFullYear()
										+ ' ' 
										+ ("00" + jobDate.getHours()).slice(-2)
										+ ':' 
										+ ("00" + jobDate.getMinutes()).slice(-2)
					}
					
					
					
					newJob.set('time', value );
					
					// if exist then remove it
					var item = jobsStore.findRecord('id', oneJob.id['value']);
					if (item != null) {
						jobsStore.remove(item);
					}
					
					jobsStore.add(newJob);
				}
				
				

				jobsStore.sync();

				jobsStore.sort([{ property: 'serviceSchedule', direction: 'ASC'}]);
				
				// hide loading
				CumminsApp.controller.AppNavigator.loading.hide();
				
				objCall.onLoadListJobsCompleteHandler();
				
			  } catch (error) {
				console.log(error);
				// hide loading
				CumminsApp.controller.AppNavigator.loading.hide();
			  }
			}
		})
	},
	
	callServiceJobDetail: function(id, objCall) {
		var technicianHomeView = objCall.getTechnicianHomeView();
		
		// test store job detail, if not exist then call service to get data
		var jobDetailsStore = Ext.getStore("JobDetails");
		var newJobDetail = jobDetailsStore.findRecord('id', id);
		if (newJobDetail == null) {
			// show loading
			CumminsApp.controller.AppNavigator.loading.show();
						
			var singletonUserTechnician = CumminsApp.model.UserTechnician;
			
			// get list jobs of technician
			var sessionId = singletonUserTechnician.get('id');;
			var module_name = 'CDV_JobOrders';
			var query = "cdv_joborders.id='" + id + "'";
			var order_by = '';
			var offset = '';
			var select_fields = '""';
			var link_name_to_fields_array = '["id"]';
			var max_results = '';
			var deleted = 0;
			var Favorites = false;
			
			Ext.Ajax.request({
				url: CumminsApp.controller.Services.getRestUrl(),
				method: 'POST',
				params: {
					input_type: 'json',
					method: 'get_entry_list',
					response_type: 'json',
					rest_data: '["' + sessionId + '", "' + module_name + '", "' + query + '", "' + order_by + '", "' + offset + '", ' + select_fields + ', ' + link_name_to_fields_array + ', "' + max_results + '", ' + deleted + ', ' + Favorites + ']'				
				},
				success: function (response) {					
					var result = JSON.parse(response.responseText);
					
					var oneJobDetail = result.entry_list[0].name_value_list;
					newJobDetail = Ext.create("CumminsApp.model.JobDetail", {
						id					: oneJobDetail[CumminsApp.model.JobDetail.ID]['value'],
						name				: oneJobDetail[CumminsApp.model.JobDetail.NAME]['value'],
						description			: oneJobDetail[CumminsApp.model.JobDetail.DESCRIPTION]['value'],
						service_location_c	: oneJobDetail[CumminsApp.model.JobDetail.SERVICE_LOCATION_C]['value'],
						charge_type_c		: oneJobDetail[CumminsApp.model.JobDetail.CHARGE_TYPE_C]['value'],
						type				: oneJobDetail[CumminsApp.model.JobDetail.TYPE]['value'],
						office_address_city	: oneJobDetail[CumminsApp.model.JobDetail.OFFICE_ADDRESS_CITY]['value'],
						account_id_c		: oneJobDetail[CumminsApp.model.JobDetail.ACCOUNT_ID_C]['value'],
						
						office_address_city	: oneJobDetail[CumminsApp.model.JobDetail.OFFICE_ADDRESS_CITY]['value'],
						job_status_c		: oneJobDetail[CumminsApp.model.JobDetail.JOB_STATUS_C]['value'],
						job_priority_c		: oneJobDetail[CumminsApp.model.JobDetail.JOB_PRIORITY_C]['value'],
						date_start			: oneJobDetail[CumminsApp.model.JobDetail.DATE_START]['value'],
						job_start_time_c	: oneJobDetail[CumminsApp.model.JobDetail.JOB_START_TIME_C]['value'],
						wip_details_c		: oneJobDetail[CumminsApp.model.JobDetail.WIP_DETAILS_C]['value']
					});
					
					jobDetailsStore.add(newJobDetail);

					jobDetailsStore.sync();
						
					// hide loading
					CumminsApp.controller.AppNavigator.loading.hide();
														
					//technicianHomeView.fireEvent('getAccountDetailEvent', { jobDetail: newJobDetail } );
					objCall.onGetJobDetailSuccessHandler( newJobDetail );
				}
			})
		} else {
			// dispatch event showJobDetailEvent
			objCall.onGetJobDetailSuccessHandler( newJobDetail );
		}
		
				
	},

	callServiceAccountDetail: function(newJobDetail, objCall) {
		var technicianHomeView = objCall.getTechnicianHomeView();
		
		// test store account detail, if not exist then call service to get data
		var id = newJobDetail.get('account_id_c');
		var accountDetailsStore = Ext.getStore("AccountDetails");
		var newAccountDetail = accountDetailsStore.findRecord('id', id);
		if (newAccountDetail == null) {
			// show loading
			CumminsApp.controller.AppNavigator.loading.show();
						
			var singletonUserTechnician = CumminsApp.model.UserTechnician;
			
			// get list jobs of technician
			var sessionId = singletonUserTechnician.get('id');;
			var module_name = 'CDV_Accounts';
			var query = "cdv_accounts.id='" + id + "'";
			var order_by = '';
			var offset = '';
			var select_fields = '""';
			var link_name_to_fields_array = '["id"]';
			var max_results = '';
			var deleted = 0;
			var Favorites = false;
			
			Ext.Ajax.request({
				url: CumminsApp.controller.Services.getRestUrl(),
				method: 'POST',
				params: {
					input_type: 'json',
					method: 'get_entry_list',
					response_type: 'json',
					rest_data: '["' + sessionId + '", "' + module_name + '", "' + query + '", "' + order_by + '", "' + offset + '", ' + select_fields + ', ' + link_name_to_fields_array + ', "' + max_results + '", ' + deleted + ', ' + Favorites + ']'				
				},
				success: function (response) {			
					var result = JSON.parse(response.responseText);
					
					var oneAccountDetail = result.entry_list[0].name_value_list;
					newAccountDetail = Ext.create("CumminsApp.model.AccountDetail", {
						id						: oneAccountDetail[CumminsApp.model.AccountDetail.ID]['value'],
						name					: oneAccountDetail[CumminsApp.model.AccountDetail.NAME]['value'],
						description				: oneAccountDetail[CumminsApp.model.AccountDetail.DESCRIPTION]['value'],
						office_address_city		: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_ADDRESS_CITY]['value'],
						office_address_province	: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_ADDRESS_PROVINCE]['value'],
						office_address_district	: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_ADDRESS_DISTRICT]['value'],
						office_address_country	: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_ADDRESS_COUNTRY]['value'],
						office_address_street	: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_ADDRESS_STREET]['value'],
						jobsite_address_city	: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_CITY]['value'],
						jobsite_address_province: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_PROVINCE]['value'],
						jobsite_address_district: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_DISTRICT]['value'],
						jobsite_address_country	: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_COUNTRY]['value'],
						jobsite_address_street	: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_ADDRESS_STREET]['value'],
						office_phone_c			: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_PHONE_C]['value'],
						account_url_c			: oneAccountDetail[CumminsApp.model.AccountDetail.ACCOUNT_URL_C]['value'],
						customer_code_c			: oneAccountDetail[CumminsApp.model.AccountDetail.CUSTOMER_CODE_C]['value'],
						mobile_phone_c			: oneAccountDetail[CumminsApp.model.AccountDetail.MOBILE_PHONE_C]['value'],
						office_latitude_c		: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_LATITUDE_C]['value'],
						office_longitude_c		: oneAccountDetail[CumminsApp.model.AccountDetail.OFFICE_LONGITUDE_C]['value'],	
						jobsite_latitude_c		: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_LATITUDE_C]['value'],
						jobsite_longitude_c		: oneAccountDetail[CumminsApp.model.AccountDetail.JOBSITE_LONGITUDE_C]['value']
						
					});
										
					accountDetailsStore.add(newAccountDetail);

					accountDetailsStore.sync();
						
					// hide loading
					CumminsApp.controller.AppNavigator.loading.hide();
														
					technicianHomeView.fireEvent('showJobDetailEvent', { jobDetail: newJobDetail, accountDetail: newAccountDetail } );
					
				}
			})
		} else {
			// dispatch event showJobDetailEvent
			technicianHomeView.fireEvent('showJobDetailEvent', { jobDetail: newJobDetail, accountDetail: newAccountDetail } );
		}
		
				
	},
	
	
	callServiceSetStartJobTime: function(data, objCall) {
		console.log("callServiceSetStartJobTime");			
	   
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var sessionId = singletonUserTechnician.get('id');;
		var module_name = 'CDV_JobOrders';
		var name_value_list = '[{"name":"id", "value":"' + data.id + '"}, { "name":"job_start_time_c", "value":"' + data.currentTime + '"} ]';
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_entry',
				response_type: 'json',
				rest_data: 	'["' + sessionId + '", "' + module_name + '", ' + name_value_list + ']'			
			},
			success: function (response) {
				console.log(response.responseText);
				//objCall.loginSuccessDelegate(response);
			}
		})
	},
	
	callServiceSetEndJobTime: function(data, objCall) {
	   
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var sessionId = singletonUserTechnician.get('id');;
		var module_name = 'CDV_JobOrders';
		var name_value_list = '[{"name":"id", "value":"' + data.id + '"}, { "name":"job_end_time_c", "value":"' + data.currentTime + '"} ]';
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_entry',
				response_type: 'json',
				rest_data: 	'["' + sessionId + '", "' + module_name + '", ' + name_value_list + ']'			
			},
			success: function (response) {
				console.log(response.responseText);
				//objCall.loginSuccessDelegate(response);
			}
		})
	},

	callServiceSetDispatchTime: function(data, objCall) {
	   
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var sessionId = singletonUserTechnician.get('id');;
		var module_name = 'CDV_JobOrders';
		var name_value_list = '[{"name":"id", "value":"' + data.id + '"}, { "name":"dispatch_time_c", "value":"' + data.currentTime + '"} ]';
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_entry',
				response_type: 'json',
				rest_data: 	'["' + sessionId + '", "' + module_name + '", ' + name_value_list + ']'			
			},
			success: function (response) {
				console.log(response.responseText);
				//objCall.loginSuccessDelegate(response);
			}
		})
	},
	
	callServiceSetReturnTime: function(data, objCall) {
	   
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		var sessionId = singletonUserTechnician.get('id');;
		var module_name = 'CDV_JobOrders';
		var name_value_list = '[{"name":"id", "value":"' + data.id + '"}, { "name":"return_time_c", "value":"' + data.currentTime + '"} ]';
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_entry',
				response_type: 'json',
				rest_data: 	'["' + sessionId + '", "' + module_name + '", ' + name_value_list + ']'			
			},
			success: function (response) {
				console.log(response.responseText);
				//objCall.loginSuccessDelegate(response);
			}
		})
	},
		   
    callServiceSetRelationshipJobAndDocument: function(data, objCall) {
		console.log("callServiceSetRelationshipJobAndDocument");
		
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		
		var sessionId = singletonUserTechnician.get(CumminsApp.model.UserTechnician.ID);
		var module_name = 'CDV_JobOrders';
		var module_id = '6ea4aeeb-0a8a-1eb2-e24c-5033074f3ca0';
		var link_field_name = 'cdvjoborders_documents';
		var related_ids = '["7f4e762e-50cb-32ec-8830-50332ebb30b6"]';
		console.log('["' + sessionId + '", "' + module_name + '", "' + module_id + '", "' + link_field_name + '", ' + related_ids + ']');
		
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_relationship',
				response_type: 'json',
				rest_data: '["' + sessionId + '", "' + module_name + '", "' + module_id + '", "' + link_field_name + '", ' + related_ids + ']'				
			},
			
			success: function (response) {
				console.log(response.responseText);
				
			}
		})
		
    },
    
    callServiceUploadInvoiceImage: function(data, objCall) {
		console.log("callServiceUploadInvoiceImage");
		
		var singletonUserTechnician = CumminsApp.model.UserTechnician;
		
		var sessionId = singletonUserTechnician.get(CumminsApp.model.UserTechnician.ID);
		var id = '';
		var revision = '1';
		var file_name = 'invoice.png';
        var base64file = data;
		var document_revision = '["' + id + '", "' + revision + '", "' + file_name + '", "' + base64file +'"]';
		console.log('["' + sessionId + '", ' + document_revision + ']');
        
		Ext.Ajax.request({
			url: CumminsApp.controller.Services.getRestUrl(),
			method: 'POST',
			params: {
				input_type: 'json',
				method: 'set_document_revision',
				response_type: 'json',
				rest_data: '["' + sessionId + '", ' + document_revision + ']'
			},
			
			success: function (response) {
				console.log(response.responseText);
				
			}
		})
		
    }
    
}

});