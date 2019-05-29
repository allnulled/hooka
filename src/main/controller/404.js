module.exports = function (req, res, next) {
	return res.status(404).json({
		error: true,
		statusCode: 404,
		status: "Resource not found",
	});
};