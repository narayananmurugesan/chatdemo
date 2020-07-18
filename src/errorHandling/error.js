import notify from '../notification/notifications';

export const errorHandling = {
    ErrorMessage
};
function ErrorMessage(param) {
    var error = param;
    const statusCode = error.response ? error.response.status : null;
    var err = {
        type: "danger",
        title: "Message",
        message: ""
    }   
    if (statusCode === 500) {
         err.message = 'Inconsistent data in request. Please check data';
    }
    else if (statusCode !== null) {
        err.message = error.response.data.errors[0];
    }
    notify.notification(err);
}