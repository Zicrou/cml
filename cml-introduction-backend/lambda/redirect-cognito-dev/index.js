exports.handler = (event, context, callback) => {
    // Identify why was this function invoked
    if(event.triggerSource === "CustomMessage_SignUp") {
        console.log('function triggered');
        console.log(event);
        // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
        const { codeParameter } = event.request
        const { userName, region } = event
        const { clientId } = event.callerContext
        const { email } = event.request.userAttributes
        const url = 'http://localhost:9000/login'
        const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank">Verify</a>`
        event.response.emailSubject = "Your verification link"; // event.request.codeParameter
        event.response.emailMessage = `<!DOCTYPE html>
<html lang="en">

<head>
  <title>CML</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
      font-family: sans-serif;
    }

    .email-body{
      background-image: linear-gradient(#eeeeee, #2bbbd3);
      padding-bottom:50px;
    }
    .confirmed-email-cml-logo {
      width: 100%;
      text-align: center;
      margin-top: 3%;
    }

    .confirmed-email-title p {
      text-align: center;
      font-weight: 700;
      font-size: 24px;
      color: #2bbbd3;
    }

    .email-content {
      width: 50%;
      margin: auto;
      background: rgba(255, 255, 255, 0.75);
    }

    .first-emoji {
      font-size: 24px;
      font-weight: 400;
    }

    .second-emoji {
      font-size: 24px;
      font-weight: 400;
    }

    p.content-title {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #2bbbd3;
      padding-top: 32px;
    }

    .email-text {
      width: 90%;
      margin: auto;
      color: rgba(0, 0, 0, 0.5);
    }

    p.email-text {
      color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      font-weight: 400;
    }

    .email-info {
      background: white;
      width: 100%;
      margin: auto;
      color: rgba(0, 0, 0, 0.5);
    }

    .email-profile-btn {
      text-align: center;
      padding-bottom: 32px;
    }

    .email-profile-btn button {
      padding: 15px 30px 15px 30px;
      background-color: rgb(43, 187, 211);
      border: 1px solid white;
      color: white;
    }
    .ii a[href] {
      color: #fff;
      text-decoration: none;
    } 

    p.send-date-time {
      padding-left: 20px;
      padding-top: 11px;
    }

    p.send-location {
      padding-left: 20px;
      padding-bottom: 11px;
    }

    @media only screen and (max-width: 768px) and (min-width: 375px) {
      .email-content {
        width: 90%;
        margin: auto;
        background: rgba(255, 255, 255, 0.75);
      }
    }
  </style>
</head>

<body>
<div class="email-body" >
  <div class="confirmed-email-cml-logo">
    <img src="./images/cml-logo.png" alt="" />
  </div>
  <div class="confirmed-email-title">
    <p>Center for Muslım Lıfe</p>
  </div>
  <div class="email-content">
    <p class="content-title">
      <span>  🎺 Welcome 🎺</span>
    </p>
    <div class="email-text">
      <p>
      Congratulations on taking the first step towards finding your soulmate! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra massa ac ipsum feugiat imperdiet. Etiam eros turpis, facilisis quis tempus a, tristique vel odio. Vestibulum viverra mi ut volutpat tristique. Quisque maximus a sapien et facilisis. Integer elementum, lorem id gravida fringilla, libero lorem ultricies arcu, vitae fringilla nisi leo eu mauris. Morbi quis sollicitudin massa, id pulvinar nibh. Donec finibus placerat dui, quis congue arcu. Donec fringilla metus quis nisi ornare egestas.

Before any of that, let's go and fill out your profile!

      </p>

      
    <div class="email-profile-btn">
      <button>${link}</button>
      
    </div>
  </div>
  </div>
</body>

</html>Thank you for signing up. Click ${link} to verify your email.`;
    }

    // Return to Amazon Cognito
    callback(null, event);
};
