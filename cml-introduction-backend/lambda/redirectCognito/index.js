const { emailSubject, emailBody } = require("./confirmationEmailTemplate");
const LOGIN_URL = "https://intros.centerformuslimlife.com/login";

exports.handler = (event, context, callback) => {
  const { codeParameter } = event.request;
  const { userName, region } = event;
  const { clientId } = event.callerContext;
  const { email } = event.request.userAttributes;

  const verificationUrl = new URL(LOGIN_URL);
  verificationUrl.searchParams.append("username", userName);
  verificationUrl.searchParams.append("clientId", clientId);
  verificationUrl.searchParams.append("region", region);
  verificationUrl.searchParams.append("email", email);
  const link = `${verificationUrl.href}&code=${codeParameter}`;

  event.response.emailSubject = emailSubject;
  event.response.emailMessage = emailBody(link);

  // Return to Amazon Cognito
  callback(null, event);
};
