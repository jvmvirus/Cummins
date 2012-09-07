Ext.define("CumminsApp.model.AccountDetail", {
    extend: "Ext.data.Model",
	
	statics: {
		ID						: 'id',
		NAME					: 'name',
		DESCRIPTION				: 'description',
		OFFICE_ADDRESS_CITY		: 'office_address_city',
		OFFICE_ADDRESS_PROVINCE	: 'office_address_province',
		OFFICE_ADDRESS_DISTRICT	: 'office_address_district',
		OFFICE_ADDRESS_COUNTRY	: 'office_address_country',
		OFFICE_ADDRESS_STREET	: 'office_address_street',
		JOBSITE_ADDRESS_CITY	: 'jobsite_address_city',
		JOBSITE_ADDRESS_PROVINCE: 'jobsite_address_province',
		JOBSITE_ADDRESS_DISTRICT: 'jobsite_address_district',
		JOBSITE_ADDRESS_COUNTRY	: 'jobsite_address_country',
		JOBSITE_ADDRESS_STREET	: 'jobsite_address_street',
		OFFICE_PHONE_C			: 'office_phone_c',
		ACCOUNT_URL_C			: 'account_url_c',
		CUSTOMER_CODE_C			: 'customer_code_c',
		MOBILE_PHONE_C			: 'mobile_phone_c',
		OFFICE_LATITUDE_C		: 'office_latitude_c',
		OFFICE_LONGITUDE_C		: 'office_longitude_c',
		JOBSITE_LATITUDE_C		: 'jobsite_latitude_c',
		JOBSITE_LONGITUDE_C		: 'jobsite_longitude_c'

	},
	
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id',						type: 'string' },
			{ name: 'name',						type: 'string' },
			{ name: 'description',				type: 'string' },
			{ name: 'office_address_city',		type: 'string' },
			{ name: 'office_address_province',	type: 'string' },
			{ name: 'office_address_district',	type: 'string' },
			{ name: 'office_address_country',	type: 'string' },
			{ name: 'office_address_street',	type: 'string' },
						
			{ name: 'jobsite_address_city',		type: 'string' },
			{ name: 'jobsite_address_province',	type: 'string' },
			{ name: 'jobsite_address_district',	type: 'string' },
            { name: 'jobsite_address_country',	type: 'string' },
			{ name: 'jobsite_address_street',	type: 'string' },
			
			{ name: 'office_phone_c',		type: 'string' },
			{ name: 'account_url_c' ,		type: 'string' },
			{ name: 'customer_code_c',		type: 'string' },
			{ name: 'mobile_phone_c',		type: 'string' },
			{ name: 'office_latitude_c',	type: 'float' },
			{ name: 'office_longitude_c',	type: 'float' },
			{ name: 'jobsite_latitude_c',	type: 'float' },
			{ name: 'jobsite_longitude_c',	type: 'float' },
        ]
    }
});