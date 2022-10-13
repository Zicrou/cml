import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createDemographics } from '../../redux/actions/demographics/create'
import { Button, Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { Widget } from '@uploadcare/react-widget'
import Avatar from 'react-avatar-edit'
import { RootState } from '../../redux/reducers/index'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
const Demographics: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch()
  const [imgError, setImgError] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(false)
  const demographicsStatus = useSelector((state: RootState) => state.createDemographics)

  const [preview, setPreview] = useState<string>()
  const [imageSizeError, setImageSizeError] = useState(false)
  useEffect(() => {
    if (demographicsStatus && demographicsStatus.status === 201) {
      history.push('/home')
    } else if (demographicsStatus && demographicsStatus.status === 409) {
      setIsDuplicate(true)
    }
  }, [demographicsStatus, history])
  const onSubmit = (event: any) => {
    event.preventDefault()
    setIsDuplicate(false)
    const formData: any = new FormData(event.target)
    const formDataObj: any = Object.fromEntries(formData.entries())
    formDataObj.imgObj = preview
    if (preview) {
      dispatch(createDemographics(formDataObj))
    } else {
      setImgError(true)
    }
  }
  const onClose = () => {
    setPreview('close')
  }

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 1024 * 1024 * 10) {
      setImageSizeError(true)
      elem.target.value = ''
    }
  }

  const onCrop = (preview: any) => {
    setPreview(preview)
  }

  if (preview === 'close') {
    setPreview('')
  }

  return (
    <div className="container-fluid">
      <LogoutButton />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="cml-logo-title">
            <div className="cml-logo">
              <img src={logo} alt="" />
            </div>
            <div className="logo-text logo-title">
              <b>INTRODUCTIONS</b>
            </div>
            <div className="sub-heading">
              <b>Finally</b>
            </div>
          </div>

          <div className="image-upload">
            <Avatar
              width={320}
              height={295}
              onCrop={onCrop}
              onClose={onClose}
              src={''}
              onBeforeFileLoad={onBeforeFileLoad}
              label="Upload Profile Picture"
            />
            {imageSizeError ? <p className="error">Please upload image under 10mb size</p> : null}
          </div>
          {imgError ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold', color: 'red' }}>Please upload Image</p>
            </div>
          ) : (
            ''
          )}

          <div className="form-section">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control select-input name-input"
                  placeholder="Full Name"
                  id="fname"
                  required
                  name="name"
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control select-input calender-input"
                  placeholder="Date of Birth"
                  id="dob"
                  required
                  name="dob"
                />
              </div>
              <div className="form-group">
                <select className="custom-select custom-select-lg select-input" name="denomination" required>
                  <option value="">Denomination</option>
                  <option value="sunni">Sunni</option>
                  <option value="shia">Shia</option>
                </select>
              </div>
              <div className="form-group">
                <select className="custom-select custom-select-lg select-input" name="ethnicBackground" required>
                  <option value="">Ethnic Background</option>
                  <option value="arab">Arab</option>
                  <option value="indo-Pak">Indo-Pak</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <select className="custom-select custom-select-lg select-input" name="previouslyMarried" required>
                  <option value="">Marital Status</option>
                  <option value="no">Single</option>
                  <option value="once">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control select-input"
                  placeholder="Address"
                  id="address"
                  required
                  name="address"
                />
                <span>
                  <i className="fa fa-lock demographics-lock-icon"></i>
                </span>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control tel-input select-input"
                  placeholder="Telephone"
                  id="telInput"
                  required
                  name="telephone"
                />
                <span>
                  <i className="fa fa-lock demographics-lock-icon"></i>
                </span>
              </div>
              <div className="text-center">
                {isDuplicate ? (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', color: 'red' }}>Demographics already exist</p>
                  </div>
                ) : (
                  ''
                )}
                {demographicsStatus === true ? (
                  <Loader />
                ) : (
                  <button type="submit" className="submit-btn">
                    Lets Go!
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  )
}

export default withRouter(Demographics)
