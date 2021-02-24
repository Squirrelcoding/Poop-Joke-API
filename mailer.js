var nodemailer = require('nodemailer');
var email = process.env.EMAIL;
var password = process.env.PASSWORD
var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: email,
    pass: password
  }
});
exports.sendMail = function(target, apiKey) {
	var mailOptions = {
		from: email,
		to: target,
		subject: 'Thank you for using Poop Joke API!',
		html: "Hello, thank you for choosing the poop joke api! Here is your API Key: " + apiKey
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent Successfuly!');
		}
	});
}