module.exports = (req, res, next) => {
	return res.status(200).json({
		success: true,
		statusCode: 200,
		status: "OK",
		message: "Logged in successfully"
	});
};