var aws = require('aws-sdk');
aws.config.update({
    region: 'us-east-1'
});

exports.handler = (event, context, callback) => {
    if (event.request.userAttributes["cognito:user_status"] !== "EXTERNAL_PROVIDER") {
        return callback(null, event);
    }

    const cognitoIdServiceProvider = new aws.CognitoIdentityServiceProvider({
        apiVersion: '2016-04-18',
        region: 'us-east-1'
    });
    var params = {
        UserAttributes: [{
            Name: "email_verified",
            Value: "true"
        }],
        UserPoolId: event.userPoolId,
        Username: event.userName
    }

    cognitoIdServiceProvider.adminUpdateUserAttributes(params, function(err, data) {
        if (err) {
            console.log('[ERROR] updating user attributes');
            console.log(err);
            callback(null, event);
        } else {
            console.log('[SUCCESS] updated user attributes');
            callback(null, event);
        }
    });
};