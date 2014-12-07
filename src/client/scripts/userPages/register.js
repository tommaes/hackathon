$(document).ready(function () {
	
	var validationRules = {
		register_email: {
			required: true,
			email: true,
			remote: {
				url: '/user/validate/register_email',
				type: 'post'
			}
		},
		register_password: {
			minlength: 6,
			required: true
		},
		username: {
			required: true,
			remote: {
				url: '/user/validate/register_username',
				type: 'post'
			}
		}
	};

	/**
	 * Validate each form: just get them all and validate them one by one while iterating over them.
	 */
	$('.form-login').each(function() {
		$(this).validate({
			rules: validationRules,
			highlight: function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},
			unhighlight: function(element) {
				$(element).closest('.form-group').removeClass('has-error');
			},
			errorElement: 'span',
			errorClass: 'help-block',
			errorPlacement: function(error, element) {
				if(element.parent('.input-group').length) {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				}
			}
		});
	});
});