import React from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import passwordValidator from 'password-validator'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../../aws-exports'
import './style.css'
import logo from './logo.png'
import backgroundImg from './background-img.png'
import googleIcon from './google-icon.svg'
import facebookBlueIcon from './facebook-blue-icon.svg'

const displayForm = () => {
  const x = document.getElementById('form-hide')!
  x.style.display = 'block'
  const y = document.getElementById('social-media-hide')!
  y.style.display = 'block'
}

Amplify.configure(awsconfig)
Auth.configure(awsconfig)

const Signup: React.FunctionComponent = () => {
  const [isError, setIsError] = React.useState()
  const [isSuccess, setIsSuccess] = React.useState<any>()
  const [isLoader, setIsLoader] = React.useState(false)
  const [isPasswordValid, setIsPasswordValid] = React.useState<any>()
  const [isEmailValid, setIsEmailValid] = React.useState<any>()
  const schema = new passwordValidator()
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
  const onFinish = (event: any) => {
    event.preventDefault()
    setIsError(undefined)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (isPasswordValid && isEmailValid && event) {
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
          setIsSuccess('Confirmation email has been sent.')
          return
        })
        .catch((err: { message: any }) => {
          setIsLoader(false)
          setIsError(err.message || JSON.stringify(err))
          return
        })
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="CML-logo">
              <img src={logo} alt="" />
            </div>
            <div className="logo-title">
              <b>INTRODUCTIONS</b>
            </div>
          </div>
          <div className="col-md-6">
            <div className="sign-in-btn">
              <Link to="/login">
                <button type="button">
                  <a style={{ color: 'white' }}>Sign In</a>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 col-sm-5 col-lg-5 col-xl-5 col-12">
            <div className="sign-up-form">
              <div className="form-heading">
                <p>I&apos;m looking for</p>
              </div>

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

                <div className="show-div" id="form-hide">
                  <div className="input-container">
                    <i className="far fa-envelope message-icon"></i>
                    <input
                      className="form-field"
                      type="text"
                      placeholder="email address"
                      name="email"
                      onChange={(e) => {
                        validateEmail(e)
                      }}
                    />
                    {isEmailValid === false ? (
                      <p className="text-danger">Email is invalid</p>
                    ) : isEmailValid === true ? (
                      <p className="text-success">Email is valid</p>
                    ) : null}
                  </div>
                  <div className="input-container">
                    <span>
                      <i className="fa fa-lock sign-up-lock-icon"></i>
                    </span>
                    <input
                      className="form-field"
                      type="password"
                      placeholder="create your password"
                      name="password"
                      onChange={(e) => {
                        validatePassword(e)
                      }}
                    />
                    {isPasswordValid === false ? (
                      <p className="text-danger">Password must be 8 characters long and alphanumeric</p>
                    ) : isPasswordValid === true ? (
                      <p className="text-success">Password acceptable</p>
                    ) : null}
                  </div>
                  <p className="form-content">
                    By clicking below to sign up, you confirm that you agree to our Terms and Conditions.
                  </p>
                </div>
                {isError ? <p className="error">{isError}</p> : ''}
                {isSuccess ? <p className="success">{isSuccess}</p> : ''}
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

export default Signup
