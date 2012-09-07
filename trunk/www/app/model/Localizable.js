Ext.define("CumminsApp.model.Localizable", {
    extend: "Ext.data.Model",
	singleton: true,
	
	LANGUAGE: {
		ENGLISH		: 'English',
		VIETNAMESE	: 'Vietnamese'
	},
	
	/**
	/* default language is English
	*/
	USERNAME: 'Username',
	PASSWORD: 'Password',
	REMEMBER: 'Remember',
	SIGNIN	: 'Sign in',
	EMPTY_USERNAME: 'Empty username',
	EMPTY_PASSWORD: 'Empty password',
	LOGIN_FAIL: 'Login fail',
	LOGIN_FAIL_MESSAGE: 'Wrong username or password. Please try again!',
	SIGNOUT	: 'Sign out',
	SEARCH	: 'Search',
	TODAY	: 'Today',
	TOMORROW: 'Tomorrow',
	SIGNOUT_MESSAGE: 'Are you want to sign out?',
	OK : 'OK',
	NO: 'No',
	YES: 'Yes',
	BACK: 'Back',
	
	DETAIL: 'Detail',
	STATUS: 'Status',
	SIGNATURE: 'Signature',
	MAP: 'Map',
	START: 'Start',
	STOP: 'Stop',
	START_JOB: 'Start job',
	DISPATCH: 'Dispatch',
	CANCEL: 'Cancel',
	END_JOB: 'End job',
	RETURN: 'Return',
	DIRECT_TO_HERE: 'Direct to here',
	
	JOB_DETAIL			: 'JOB DETAIL',
	JOB					: 'Job',
	TYPE				: 'Type',
	SERVICE_LOCATION	: 'Service <br/>Location',
	DESCRIPTION			: 'Description',
	PRIORITY			: 'Priority',
	CHARGE				: 'Charge',
	DATE_START			: 'Date <br/>Schedule<br/> start',
	
	ACCOUNT_DETAIL		: 'ACCOUNT DETAIL',
	ACCOUNT				: 'Account',
	OFFICE_ADDRESS		: 'Office <br/>Address',
	CUSTOMER_CODE		: 'Customer <br/>Code',
	JOBSITE_ADDRESS		: 'Jobsite <br/>Address',
	
	CONTACT_DETAIL		: 'CONTACT DETAIL',
	NAME				: 'Name',
	PHONE				: 'Phone',
	WEBPAGE				: 'Webpage',
	EMAIL				: 'Email',
	MOBILE				: 'Mobile',
	
	constructor: function() {
		console.log('Localizable constructor');
		this.callParent();
		
		
		var languageName = localStorage.getItem("CumminsLanguage");
		if (languageName == 'undefined') // default language is English
			languageName = this.LANGUAGE.ENGLISH;
			
		console.log(languageName);	
		// now we only support English and Vietnamese
		switch (languageName) {
		case this.LANGUAGE.ENGLISH:
			this.USERNAME = 'Username';
			this.PASSWORD = 'Password';
			this.REMEMBER = 'Remember';
			this.SIGNIN = 'Sign in';
			this.SIGNOUT = 'Sign out';
			this.SEARCH = 'Search';
			this.TODAY = 'Today';
			this.TOMORROW = 'Tomorrow';
			this.SIGNOUT_MESSAGE = 'Are you want to sign out?';
			this.LOGIN_FAIL = 'Login fail';
			this.LOGIN_FAIL_MESSAGE = 'Wrong username or password. Please try again!';
			this.OK = 'OK';
			this.NO = 'No';
			this.YES = 'Yes';
			this.BACK = 'Back';
			this.DETAIL = 'Detail';
			this.STATUS = 'Status';
			this.SIGNATURE = 'Signature';
			this.MAP = 'Map';
			this.START = 'Start';
			this.STOP = 'Stop';
			this.START_JOB ='Start job';
			this.DISPATCH = 'Dispatch';
			this.CANCEL = 'Cancel';
			this.END_JOB = 'End job';
			this.RETURN = 'Return';
			this.DIRECT_TO_HERE = 'Direct to here';
			
			this.JOB_DETAIL			= 'JOB DETAIL';
			this.JOB					= 'Job';
			this.TYPE				= 'Type';
			this.SERVICE_LOCATION	= 'Service <br/>Location';
			this.DESCRIPTION			= 'Description';
			this.PRIORITY			= 'Priority';
			this.CHARGE				= 'Charge',
			this.DATE_START			= 'Date <br/>start';
			
			this.ACCOUNT_DETAIL		= 'ACCOUNT DETAIL';
			this.ACCOUNT				= 'Account',
			this.OFFICE_ADDRESS		= 'Office <br/>Address';
			this.CUSTOMER_CODE		= 'Customer <br/>Code',
			this.JOBSITE_ADDRESS		= 'Jobsite <br/>Address';
			
			this.CONTACT_DETAIL		= 'CONTACT DETAIL';
			this.NAME				= 'Name';
			this.PHONE				= 'Phone';
			this.WEBPAGE				= 'Webpage';
			this.EMAIL				= 'Email';
			this.MOBILE				= 'Mobile';
	
		break;
		case this.LANGUAGE.VIETNAMESE:
			this.USERNAME = 'Tên người dùng';
			this.PASSWORD = 'Mật khẩu';
			this.REMEMBER = 'Ghi nhớ';
			this.SIGNIN = 'Đăng nhập';
			this.SIGNOUT = 'Đăng xuất';
			this.SEARCH = 'Tìm';
			this.TODAY = 'Hôm nay';
			this.TOMORROW = 'Ngày mai';
			this.SIGNOUT_MESSAGE = 'Bạn có chắc muốn đăng xuất?';
			this.LOGIN_FAIL = 'Đăng nhập thất bại';
			this.LOGIN_FAIL_MESSAGE = 'Tên người dùng hoặc mật khẩu sai. Vui lòng thử lại!';
			this.OK = 'Đóng';
			this.NO = 'Không';
			this.YES = 'Có';
			this.BACK = 'Trở lại';
			this.DETAIL = 'Chi Tiết';
			this.STATUS = 'Trạng thái';
			this.SIGNATURE = 'Chữ ký';
			this.MAP = 'Bản đồ';
			this.START = 'Bắt đầu';
			this.STOP = 'Ngừng';
			this.START_JOB = 'Bắt đầu công việc';
			this.DISPATCH = 'Khởi hành';
			this.CANCEL = 'Huỷ bỏ';
			this.END_JOB = 'Kết thúc công việc';
			this.RETURN = 'Trở về';
			this.DIRECT_TO_HERE = 'Tìm đường';
			
			this.JOB_DETAIL			= 'CHI TIẾT CÔNG VIỆC';
			this.JOB				= 'Công việc';
			this.TYPE				= 'Loại';
			this.SERVICE_LOCATION	= 'Địa điểm';
			this.DESCRIPTION		= 'Mô tả';
			this.PRIORITY			= 'Độ ưu tiên';
			this.CHARGE				= 'Chi phí',
			this.DATE_START			= 'Ngày <br/>bắt<br/>đầu';
			
			this.ACCOUNT_DETAIL		= 'CHI TIẾT TÀI KHOẢN';
			this.ACCOUNT			= 'Tài khoản',
			this.OFFICE_ADDRESS		= 'Địa chỉ<br/>văn phòng';
			this.CUSTOMER_CODE		= 'Mã khách<br/> hàng',
			this.JOBSITE_ADDRESS	= 'Địa chỉ<br/>công<br/> trường';
			
			this.CONTACT_DETAIL		= 'CHI TIẾT LIÊN LẠC';
			this.NAME				= 'Tên';
			this.PHONE				= 'Điện thoại';
			this.WEBPAGE			= 'Trang web';
			this.EMAIL				= 'Thư<br/>điện tử';
			this.MOBILE				= 'Di động';
		break;
		}	
		
	}
});
