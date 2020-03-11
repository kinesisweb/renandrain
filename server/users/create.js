const self = module.exports = {
	validateEmail: function( email ) {
		return (email && /\w+@\w+\.\w{2,}/.test(email) === true) ? true : false;
	},
	validatePassword: function( password ) {
		if (password.length < 8) return false;
		if (/\d/.test(password) === false) return false;
		if (/[A-Z]/.test(password) === false) return false;
		return true;
	},
	validatePasswordMatch: function( { password1, password2 } ) {
		return (password1 === password2) ? true : false;
	}
}