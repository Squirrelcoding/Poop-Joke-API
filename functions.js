exports.randint = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.generate = function(length) {
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}