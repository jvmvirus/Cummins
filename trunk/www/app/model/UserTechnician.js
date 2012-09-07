Ext.define("CumminsApp.model.UserTechnician", {
    extend: "Ext.data.Model",
	singleton: true,
	
	ID					: 'id',
	MODULE_NAME			: 'module_name',
	USER_ID				: 'user_id',
	USER_NAME			: 'user_name',
	USER_LANGUAGE		: 'user_language',
	USER_CURRENCY_ID	: 'user_currency_id',
	USER_CURRENCY_NAME	: 'user_currency_name',		
	
    config: {
        fields: [
            { name: 'id', type: 'string' }, // this is session id
            { name: 'module_name', type: 'string' },
			{ name: 'user_id', type: 'string' },
			{ name: 'user_name', type: 'string' },
			{ name: 'user_language', type: 'string' },
			{ name: 'user_currency_id', type: 'string' },
			{ name: 'user_currency_name', type: 'string' }
        ]
    }
});