Ext.define("CumminsApp.store.Jobs", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "CumminsApp.model.Job",
        
        sorters: [{ property: 'date_start', direction: 'ASC'}],
        grouper: {
            sortProperty: "date_start",
            direction: "ASC",
            groupFn: function (record) {

                if (record && record.data.date_start) {
					var jobDate = new Date(record.data.date_start);
					var now = new Date();
					if ( ( jobDate.getDate() == now.getDate()  && jobDate.getMonth() == now.getMonth() && jobDate.getFullYear() == now.getFullYear() ) || ( jobDate.getTime() < now.getTime() )) 
						return CumminsApp.model.Localizable.TODAY;
					
					if (jobDate.getDate() == now.getDate()+1 && jobDate.getMonth() == now.getMonth() && jobDate.getFullYear() == now.getFullYear()) 
						return CumminsApp.model.Localizable.TOMORROW;
						
                    return record.data.date_start.toDateString();
                } else {
                    return '';
                }
            }
        }/*,
		data: [
				{ jobName:'Job 1', id: '1', dateCreated: new Date() },
				{ jobName:'Job 2', id: '2', dateCreated: new Date() },
				{ jobName:'Job 3', id: '3', dateCreated: new Date() },
				{ jobName:'Job 4', id: '4', dateCreated: new Date() },
				{ jobName:'Job 5', id: '5', dateCreated: new Date(2012,7,10) },
				{ jobName:'Job 6', id: '6', dateCreated: new Date() },
				{ jobName:'Job 7', id: '7', dateCreated: new Date() },
				{ jobName:'Job 9', id: '9', dateCreated: new Date() },
				{ jobName:'Job 10', id: '10', dateCreated: new Date() },
				{ jobName:'Job 11', id: '11', dateCreated: new Date() }
		]
		*/
    }
});
