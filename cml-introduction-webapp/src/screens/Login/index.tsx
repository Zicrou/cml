import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Toast from 'react-bootstrap/Toast'
import { useHistory, withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { LoginProps } from '../../type/entities'
import Amplify, { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'
import passwordValidator from 'password-validator'
import './style.css'
import logo from './logo.png'
import backgroundImg from './background-img.png'
import googleIcon from './google-icon.svg'
import fbWhiteIcon from './facebook-white-icon.svg'
import facebookBlueIcon from './facebook-blue-icon.svg'
import readLocalStorage from '../../utils/readLocalStorage'

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: `${process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID}`,

    // REQUIRED - Amazon Cognito Region
    region: `${process.env.REACT_APP_AWS_REGION}`,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: `${process.env.REACT_APP_AWS_REGION}`,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: `${process.env.REACT_APP_AWS_USER_POOL_ID}`,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: `${process.env.REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID}`,

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: `${process.env.REACT_APP_OAUTH_DOMAIN}`,
      scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: `${process.env.REACT_APP_POST_LOGIN_URL}`,
      redirectSignOut: `${process.env.REACT_APP_LOGOUT_URL}`,
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
})

const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const history = useHistory()
  const [isError, setIsError] = React.useState()
  const [isSuccess, setIsSuccess] = React.useState<any>()
  const [isVeifySuccess, setIsVerifySuccess] = React.useState<any>()
  const [isLoader, setIsLoader] = React.useState(false)
  const [show, setShow] = React.useState(true)
  const [showMessage, setShowMessage] = React.useState(false)
  const [showRsvpMessage, setShowRsvpMessage] = React.useState(false)
  const [isExistMessage, setIsExistMessage] = React.useState(false)
  const [errorToast, setErrorToast] = React.useState(true)
  const [isErrorLogin, setIsErrorLogin] = React.useState('')
  const [isLoaderLogin, setIsLoaderLogin] = React.useState(false)
  const [isLoginBtn, setIsLoginBtn] = React.useState(false)
  const [isPasswordValid, setIsPasswordValid] = React.useState<any>()
  const [isEmailValid, setIsEmailValid] = React.useState<any>()
  const [isPasswordValidSignup, setIsPasswordValidSignup] = React.useState<any>()
  const [isEmailValidSignup, setIsEmailValidSignup] = React.useState<any>()
  const schema = new passwordValidator()
  const pathName = props.location.state && props.location.state.from.pathname
  schema.is().min(8).is().digits(1).has().not().spaces().is().not()
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsPasswordValid(schema.validate(e.currentTarget.value))
  }

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.currentTarget.value
      )
    ) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }

  const validatePasswordSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsPasswordValidSignup(schema.validate(e.currentTarget.value))
  }

  const validateEmailSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        e.currentTarget.value
      )
    ) {
      setIsEmailValidSignup(true)
    } else {
      setIsEmailValidSignup(false)
    }
  }
  const onSubmit = (event: any) => {
    event.preventDefault()

    setIsErrorLogin('')
    setIsError(undefined)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    const redirectUri = localStorage.getItem('redirectURL')
    if (formDataObj.email.includes(' ')) {
      formDataObj.email = formDataObj.email.trim()
    }
    if (formDataObj.email && formDataObj.password) {
      setIsLoaderLogin(true)
      Auth.signIn(formDataObj.email, formDataObj.password)
        .then((userData: { signInUserSession: { accessToken: { jwtToken: string } } }) => {
          Auth.currentUserInfo()
            .then((user: any) => {
              setIsLoaderLogin(false)
              localStorage.setItem('access-token', userData.signInUserSession.accessToken.jwtToken)
              redirectUri ? props.history.push(redirectUri) : props.history.push('/post-login')
            })
            .catch((err: any) => {
              setIsLoaderLogin(false)
            })
        })
        .catch((err: any) => {
          setIsLoaderLogin(false)
          setIsErrorLogin('Invalid Username or Password')
        })
    }
  }

  if (readLocalStorage('access-token')) {
    history.push('post-login')
  }
  const onVerifyClose = () => {
    setShowMessage(false)
    setIsLoginBtn(true)
  }

  const onRsvpShowClose = () => {
    const hideToast = document.getElementById('rsvp-toast')!
    hideToast.style.display = 'none'
    setShowRsvpMessage(false)
    setIsLoginBtn(true)
  }
  const onIsExistClose = () => {
    setIsExistMessage(false)
    setIsLoginBtn(true)
  }
  const onFinish = (event: any) => {
    event.preventDefault()
    setIsError(undefined)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())

    if (isPasswordValidSignup && isEmailValidSignup && event) {
      setIsLoader(true)
      Auth.signUp({
        username: formDataObj.email,
        password: formDataObj.password,
        attributes: {
          'custom:lookingFor': formDataObj.lookingfor
        }
      })
        .then(() => {
          setIsLoader(false)
          setIsSuccess(true)
          setShow(true)
          return
        })
        .catch((err: { message: any }) => {
          setIsLoader(false)
          setIsError(err.message || JSON.stringify(err))
          setErrorToast(true)
          return
        })
    }
  }

  const displayForm = () => {
    const x = document.getElementById('form-hide')!
    x.style.display = 'block'
    const y = document.getElementById('social-media-hide')!
    y.style.display = 'block'
  }
  useEffect(() => {
    if (pathName) {
      localStorage.setItem('redirectURL', pathName)
    }
  }, [pathName])

  useEffect(() => {
    setIsLoader(false)
  }, [])

  useEffect(() => {
    const redirectURL = localStorage.getItem('redirectURL')
    if (redirectURL) {
      setShowRsvpMessage(true)
    }
  })

  useEffect(() => {
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const userName = urlParams.get('username')
    const code = urlParams.get('code')

    if (code != null && userName != null) {
      const confirmSignUp = Auth.confirmSignUp(userName, code)
        .then((data: any) => {
          history.push('/login')
          setShowMessage(true)
          return
        })
        .catch((err: any) => {
          history.push('/login')
          setIsExistMessage(true)
        })
    }
  }, [])

  return (
    <>
      <div className="toastStyle" id="rsvp-toast">
        {showRsvpMessage ? (
          <div className="verify-toast-position">
            <Toast show={showRsvpMessage} onClose={() => setShowRsvpMessage(false)}>
              <Toast.Body>
                <p className="rsvp-message">Login Required! Please login to continue.</p>
                <button className="closeMessage" onClick={onRsvpShowClose}>
                  OK
                </button>
              </Toast.Body>
            </Toast>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="toastStyle">
        {showMessage ? (
          <div className="verify-toast-position">
            <Toast show={showMessage} onClose={() => setShowMessage(false)}>
              <Toast.Body>
                <p className="verifySuccessfully">You have been successfully verified.</p>
                <button className="closeMessage" onClick={onVerifyClose}>
                  OK
                </button>
              </Toast.Body>
            </Toast>
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="toastStyle">
        {isExistMessage ? (
          <div className="verify-toast-position">
            <Toast show={isExistMessage} onClose={() => setIsExistMessage(false)}>
              <Toast.Body>
                <p className="alreadyExists">User already exists. Please try with another one.</p>
                <button className="closeMessage" onClick={onIsExistClose}>
                  OK
                </button>
              </Toast.Body>
            </Toast>
          </div>
        ) : (
          ''
        )}
      </div>

      {isLoginBtn ? (
        <div className="header-section">
          <div className="container-fluid sign-in">
            <div className="row">
              <div className="col-md-4">
                <div className="flex g-fb-icons-content">
                  <div
                    className="sign-in-input-container google-login"
                    onClick={() =>
                      Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Google
                      })
                    }
                  >
                    <img src={googleIcon} alt="" className="google-icon" />
                    <input className="google-login-input" type="button" value="Login" />
                  </div>
                  <div
                    className="sign-in-input-container facebook-login"
                    onClick={() =>
                      Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Facebook
                      })
                    }
                  >
                    <img src={fbWhiteIcon} alt="" className="facebook-icon" />
                    <input className="fb-login-input" type="button" value="Login" />
                  </div>
                  <span className="seperator">or</span>
                </div>
              </div>
              <div className="col-md-8">
                <Form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="flex sign-in-form-content">
                        <div className="sign-in-input-container">
                          <i className="far fa-envelope message-icon"></i>
                          <input
                            className="sign-in-form-field"
                            type="text"
                            placeholder="email address"
                            name="email"
                            required
                          />
                        </div>
                        <div className="sign-in-input-container">
                          <i className="fa fa-lock sign-in-lock-icon"></i>
                          <input
                            className="sign-in-form-field"
                            type="password"
                            placeholder="your password"
                            name="password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      {isLoaderLogin ? (
                        <div className="logged-in-content-styling">
                          <div className="sign-in-btn">
                            <Loader />
                          </div>
                        </div>
                      ) : (
                        <div className="logged-in-content-styling">
                          <div className="logged-in-checkbox1">
                            <input type="checkbox" id="logged-in" value="" />
                            <label> Stay Logged In</label>
                            <Link to="/forgot-password">
                              <p>Forgot Password?</p>
                            </Link>
                          </div>

                          <div className="sign-in-btn-new">
                            <button type="submit">Sign In</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Form>
                <div className="error-login">{isErrorLogin ? <p className="error">{isErrorLogin}</p> : ''}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 cml-signin-logo">
            <div className="cml-logo-img">
              <img src={logo} alt="" />
            </div>
            <div className="logo-title">
              <b>INTRODUCTIONS</b>
            </div>
          </div>
          <div className="col-md-6">
            {isLoginBtn != true ? (
              <div className="logged-in-content-1">
                <div className="sign-in-btn-1">
                  <button
                    onClick={() => {
                      setIsLoginBtn(true)
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-12"></div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-12">
            <div className="toastStyle">
              {isSuccess ? (
                <div className="toast-position">
                  <Toast show={show} onClose={() => setShow(false)} delay={5000} autohide>
                    <Toast.Body>
                      Thank you. We have sent you email. Plesae verify your email and activate your account.
                    </Toast.Body>
                  </Toast>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="col-md-5 col-sm-5 col-lg-5 col-xl-5 col-12"></div>
          <div className="col-md-3 col-sm-3 col-lg-3 col-xl-3 col-12"></div>
          <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-12">
            <div className="toastStyle">
              {isError ? (
                <div className="error-toast-position">
                  <Toast show={errorToast} onClose={() => setErrorToast(false)} delay={5000} autohide>
                    <Toast.Body>An account with the given email already exists.</Toast.Body>
                  </Toast>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="col-md-5 col-sm-5 col-lg-5 col-xl-5 col-12"></div>
          <div className="col-md-5 col-sm-5 col-lg-5 col-xl-5 col-12">
            <div className="sign-up-form">
              <p className="form-heading">I&apos;m looking for</p>
              <Form onSubmit={onFinish}>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-6 col-lg-6 col-xl-6">
                    <label className="radio-inline husband-btn">
                      <input
                        type="radio"
                        name="lookingfor"
                        value="husband"
                        className="radioShow"
                        onClick={displayForm}
                      />{' '}
                      a husband
                    </label>
                  </div>
                  <div className="col-md-6 col-sm-6 col-6 col-lg-6 col-xl-6">
                    <label className="radio-inline wife-btn">
                      <input type="radio" name="lookingfor" value="wife" className="radioShow" onClick={displayForm} />{' '}
                      a wife
                    </label>
                  </div>
                </div>

                <div className="show" id="form-hide">
                  <div className="input-container">
                    <i className="far fa-envelope message-icon"></i>
                    <input
                      className="form-field"
                      type="text"
                      placeholder="email address"
                      name="email"
                      onChange={(e) => {
                        validateEmailSignup(e)
                      }}
                    />
                    {isEmailValidSignup === false ? (
                      <p className="text-danger">Email is invalid</p>
                    ) : isEmailValidSignup === true ? (
                      <p className="text-success">Email is valid</p>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <i className="fa fa-lock login-lock-icon"></i>
                    <input
                      className="form-field"
                      type="password"
                      placeholder="create your password"
                      name="password"
                      onChange={(e) => {
                        validatePasswordSignup(e)
                      }}
                    />
                    {isPasswordValidSignup === false ? (
                      <p className="text-danger">Password must be 8 characters long and alphanumeric</p>
                    ) : isPasswordValidSignup === true ? (
                      <p className="text-success">Password acceptable</p>
                    ) : null}
                  </div>
                  <p className="form-content">
                    BY CLICKING BELOW TO SIGN UP YOU CONFIRM THAT YOU AGREE TO OUR TERMS AND CONDITIONS.
                  </p>
                </div>
                {isError ? <p className="error">{isError}</p> : ''}

                <div className="join-now-btn">{isLoader ? <Loader /> : <button type="submit">Join Now</button>}</div>
              </Form>
              <div className="show" id="social-media-hide">
                <p className="divider">or</p>
                <div
                  className="input-container"
                  onClick={() =>
                    Auth.federatedSignIn({
                      provider: CognitoHostedUIIdentityProvider.Facebook
                    })
                  }
                >
                  <img src={facebookBlueIcon} alt="" className="facebook-icon" />
                  <input className="fb-field" type="button" value="Sign up with Facebook" />
                </div>
                <div
                  className="input-container"
                  onClick={() =>
                    Auth.federatedSignIn({
                      provider: CognitoHostedUIIdentityProvider.Google
                    })
                  }
                >
                  <img src={googleIcon} alt="" className="google-icon" />
                  <input className="google-field" type="button" value="Sign up with Google" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-sm-7 col-lg-7 col-xl-7 col-12">
            <div className="sign-up-img">
              <img src={backgroundImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Login)
