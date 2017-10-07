/**
 * Created by DELL on 2017-10-07.
 */
var errorHandlers = {
    notFoundHandler: function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    logError: function (err, req, res, next) {
        if (req.app.get('env') === 'development') {
            console.log(err.stack);
        }
        next(err);
    },
    apiErrorHandler: function (err, req, res, next) {
        if (req.is('application/*')) {
            res.status(err.status || 500).send({ error: err.message });
        } else {
            next(err);
        }
    },
    errorHandler: function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
};

module.exports = errorHandlers;