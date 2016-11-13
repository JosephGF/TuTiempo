var messages = {
	lastToast : null,
	dialogTemplate : '<div id="default-dialog-message" class="dialog">'
						+ '<header class="dialog-title-region">'
						  + '<h1 class="title">{title}</h1>'
						+ '</header>'
						+ '<div class="dialog-content">'
							+ '{content}'
						+ '</div>'
						+ '<ul class="dialog-actions">'
						  + '<li><a href="javascript: void(0);" class="dialog-ok-button">{button_1}</a></li>'
						  + '<li><a href="javascript: void(0);" class="dialog-cancel-button">{button_2}</a></li>'
						+ '</ul>'
					  + '</div>',
	toast : function(msg, options) {
		var _options = { content: msg, duration: 2000 };
	
		_options = $.extend(_options, options);
	
		var toast = new fries.Toast(_options);
		messages.lastToast = toast;
		return toast;
	},
	showDialog : function(html, options) {
		var _options = {
			selector: '#default-dialog-message',
			title: '',
			labelBtn1: '',
			labelBtn2: '',
			callbackOk: function () {
			  this.hide(); // this refers to the dialog
			}, 
			callbackCancel: function () {
			  this.hide(); // this refers to the dialog
			}
		};
	
		_options = $.extend(_options, options);
		
		var html = messages.dialogTemplate.replace("{content}", html)
										  .replace("{title}", options.title)
										  .replace("{button_1}", options.labelBtn1)
										  .replace("{button_2}", options.labelBtn2);

		$(".dialogs").append(html);
		
		var dialog = new fries.Dialog(_options);
		dialog.show();
		
		return dialog;
	}
}