Ext.define("CumminsApp.model.Job", {
    extend: "Ext.data.Model",
	
	statics: {
		ID					: 'id',
		DATE_START			: 'date_start',
		TIME				: 'time',
		JOB_STATUS_C		: 'job_status_c',
		NAME				: 'name'
	},

    config: {
        idProperty: 'jobId',
        fields: [
            { name: 'id', type: 'string' },
            { name: 'date_start', type: 'date', dateFormat: 'c' },
			{ name: 'time', type: 'string' },
			{ name: 'job_status_c', type: 'string' },
            { name: 'jobName', type: 'string' }
        ]
    }
});