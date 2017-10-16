/**
 * Created by DELL on 2017-10-07.
 */
const errorHandlers = {
    notFoundHandler: (req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    },
    logError: (err, req, res, next) => {
        if (req.app.get('env') === 'development') {
            console.log(err.stack);
        }
        next(err);
    },
    apiErrorHandler: (err, req, res, next) => {
        if (isApiRequest(req)) {
            res.status(err.status || 500).send({error: err.message});
        } else {
            next(err);
        }
    },
    errorHandler: (err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    },
    //only for use in services
    handleError: (msg, status, next) => {
        const err = new Error(msg);
        err.status = status;
        next(err);
    }
};

function isApiRequest(req) {
    const contentType = req.headers['content-type'];
    return ['application/json', 'application/x-www-form-urlencoded'].indexOf(contentType) !== -1;
}

module.exports = errorHandlers;