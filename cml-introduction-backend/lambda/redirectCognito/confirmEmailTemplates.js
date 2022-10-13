exports.emailSubject = "Introductions verification link";
exports.emailBody = (link) => {
  return `<!DOCTYPE html>
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
     .footer-div{
    padding-top: 10px;
    padding-botto: 20px;
    background-color: lightblue;
    width:100%;
    height:40px;
  }
  .footer-left{
    width:40%;
    float:left;
  }
  .footer-right{
    width:60%;
    float:left;
  }
  .cml-title{
    font-size:16px;
    text-align: center;
    margin-top:5px;
    font-weight: 600;
    color:rgba(0,0,0,0.5);
  }
  .contact-heading {
    font-size:16px;
    text-align: center;
    margin-top:5px;
    font-weight: 600;
    color:rgba(0,0,0,0.5);
  }
  .cml-contact-section{
    font-size:12px;
    text-align: center;
    margin-top:5px;
    font-weight: 500;
    color:rgba(0,0,0,0.5);
  }
  .i {
  color:  #E43193;
  position: relative;
    }
    .i:before {
      content: "ı";
      position: absolute;
      color: #2BBBD3; 
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
    <p>Center for Musl<span class="i">i</span>m L<span class="i">i</span>fe</p>
  </div>
  <div class="email-content">
    <p class="content-title">
      <span>  🎺 Welcome 🎺</span>
    </p>
    <div class="email-text">
       <p>
     Congratulations on taking the first step towards finding your soulmate! 
        </p
      <p>  
Center for Muslim Life is a non-profit organization committed to supporting the American Muslim Family.  Introductions is our platform for singles to be able to meet other singles as well as education specialists, counselors, and other helpers on their way to getting married.
</p>
<p>
 Marriage is a journey, but the first step is to go and fill out your profile! 
       </p>

      
    <div class="email-profile-btn">
      <button><a href="${link}" target="_blank">Verify</a></button>
    </div>
  </div>
     <div class="footer-div">
        <div class="footer-left">
          <p class="cml-title">CML Introductions</p>
        </div>
        <div class="footer-right">
          <p class="cml-contact-section"><span class="contact-heading">Contact Us:</span> info@centerformuslimlife.com</p>
        </div>
     </div>
  </div>
</body>

</html>`;
};
