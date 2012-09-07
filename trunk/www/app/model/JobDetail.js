Ext.define("CumminsApp.model.JobDetail", {
    extend: "Ext.data.Model",
	
	statics: {
		ID					: 'id',
		NAME				: 'name',
		DESCRIPTION			: 'description',
		SERVICE_LOCATION_C	: 'service_location_c',
		CHARGE_TYPE_C		: 'charge_type_c',
		TYPE				: 'type',
		OFFICE_ADDRESS_CITY	: 'office_address_city',
		ACCOUNT_ID_C		: 'account_id_c',
		OFFICE_ADDRESS_CITY	: 'office_address_city',
		JOB_STATUS_C		: 'job_status_c',
		JOB_PRIORITY_C		: 'job_priority_c',
		DATE_START			: 'date_start',
		JOB_START_TIME_C	: 'job_start_time_c',		
		WIP_DETAILS_C		: 'wip_details_c'		
	},

    config: {
        idProperty: 'id',
        fields: [
            { name: 'id',					type: 'string' },
			{ name: 'name',					type: 'string' },
			{ name: 'description',			type: 'string' },
			{ name: 'service_location_c',	type: 'string' },
			{ name: 'charge_type_c',		type: 'string' },
			{ name: 'type',					type: 'string' },
			{ name: 'office_address_city',	type: 'string' },
			{ name: 'account_id_c',			type: 'string' },
						
			{ name: 'office_address_city',	type: 'string' },
			{ name: 'job_status_c',			type: 'string' },
			{ name: 'job_priority_c',		type: 'string' },
            { name: 'date_start',	type: 'date', dateFormat: 'c' },
			{ name: 'job_start_time_c',		type: 'date', dateFormat: 'c' },
			{ name: 'wip_details_c',		type: 'string' }
			
        ]
    }
});