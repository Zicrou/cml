import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { showDemographic } from '../../redux/actions/demographics/show'
import { updateDemographics } from '../../redux/actions/demographics/update'
import Avatar from 'react-avatar-edit'
import { RootState } from '../../redux/reducers/index'
import logo from './logo.png'
import avatar from './avatar.png'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const DemographicsEdit: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch()
  const [imgError, setImgError] = useState(false)
  const showDemographicStatus = useSelector((state: RootState) => state.showDemographic)
  const updateDemographicStatus = useSelector((state: RootState) => state.updateDemographics)

  const [preview, setPreview] = useState<string>()
  const [imageSizeError, setImageSizeError] = useState(false)
  const [dob, setDob] = useState('')
  useEffect(() => {
    if ((updateDemographicStatus && updateDemographicStatus.status === 200) || updateDemographicStatus.status === 500) {
      history.push('/profile')
    }
  }, [updateDemographicStatus])

  useEffect(() => {
    dispatch(showDemographic())
  }, [dispatch])

  useEffect(() => {
    if (showDemographicStatus && showDemographicStatus.status === 200) {
      setDob(showDemographicStatus.data.dateOfBirth)
    }
  }, [showDemographicStatus])

  const onSubmit = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target)
    const formDataObj: any = Object.fromEntries(formData.entries())
    formDataObj.imgObj = preview
    dispatch(updateDemographics(formDataObj))
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

  const onDateChange = (event: any) => {
    setDob(event.target.value)
  }

  return (
    <div className="container-fluid">
      <LogoutButton />
      {showDemographicStatus === true ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="cml-logo-title">
              <Link title="Home" to="/home">
                <div className="cml-logo">
                  <img src={logo} alt="" />
                </div>
              </Link>
              <div className="logo-text logo-title">
                <b>INTRODUCTIONS</b>
              </div>
              <div className="sub-heading">
                <b>Finally</b>
              </div>
            </div>

            {imgError ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', color: 'red' }}>Please upload Image</p>
              </div>
            ) : (
              ''
            )}
            <div className="image-upload">
              {showDemographicStatus.data && showDemographicStatus.data.demographicImage.orignal != 'nil' ? (
                <Avatar
                  width={320}
                  height={295}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={`${process.env.REACT_APP_BACKEND_API_BASE}/${
                    showDemographicStatus.data && showDemographicStatus.data.demographicImage.orignal
                  }`}
                  onBeforeFileLoad={onBeforeFileLoad}
                  label="Upload"
                />
              ) : (
                <Avatar
                  width={320}
                  height={295}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={avatar}
                  onBeforeFileLoad={onBeforeFileLoad}
                  label="Upload"
                />
              )}
              {imageSizeError ? <p className="error">Please upload image under 10mb size</p> : null}
            </div>
            <div className="form-section">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control select-input name-input"
                    placeholder="Name"
                    defaultValue={showDemographicStatus.data && showDemographicStatus.data.personName}
                    id="fname"
                    name="name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control select-input calender-input"
                    value={dob}
                    id="dob"
                    name="dob"
                    onChange={onDateChange}
                  />
                </div>
                <div className="form-group">
                  {showDemographicStatus.data && showDemographicStatus.data.denomination === 'sunni' && (
                    <select className="custom-select custom-select-lg select-input" name="denomination">
                      <option value="sunni">Sunni</option>,<option value="shia">Shia</option>
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.denomination === 'shia' && (
                    <select className="custom-select custom-select-lg select-input" name="denomination">
                      <option value="shia">Shia</option>,<option value="sunni">Sunni</option>,
                    </select>
                  )}
                </div>
                <div className="form-group">
                  {showDemographicStatus.data &&
                    showDemographicStatus.data.ethnicBackground !== 'arab' &&
                    showDemographicStatus.data.ethnicBackground !== 'indo-Pak' &&
                    showDemographicStatus.data.ethnicBackground !== 'black' &&
                    showDemographicStatus.data.ethnicBackground !== 'white' &&
                    showDemographicStatus.data.ethnicBackground !== 'other' && (
                      <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                        <option value="">Select</option>,<option value="arab">Arab</option>,
                        <option value="indo-Pak">Indo-Pak</option>,<option value="black">Black</option>,
                        <option value="white">White</option>,<option value="other">Other</option>,
                      </select>
                    )}
                  {showDemographicStatus.data && showDemographicStatus.data.ethnicBackground === 'arab' && (
                    <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                      <option value="arab">Arab</option>,<option value="indo-Pak">Indo-Pak</option>,
                      <option value="black">Black</option>,<option value="white">White</option>,
                      <option value="other">Other</option>,
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.ethnicBackground === 'indo-Pak' && (
                    <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                      <option value="indo-Pak">Indo-Pak</option>,<option value="arab">Arab</option>,
                      <option value="black">Black</option>,<option value="white">White</option>,
                      <option value="other">Other</option>,
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.ethnicBackground === 'black' && (
                    <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                      <option value="black">Black</option>,<option value="indo-Pak">Indo-Pak</option>,
                      <option value="arab">Arab</option>,<option value="white">White</option>,
                      <option value="other">Other</option>,
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.ethnicBackground === 'white' && (
                    <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                      <option value="white">White</option>,<option value="indo-Pak">Indo-Pak</option>,
                      <option value="arab">Arab</option>,<option value="black">Black</option>,
                      <option value="other">Other</option>,
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.ethnicBackground === 'other' && (
                    <select className="custom-select custom-select-lg select-input" name="ethnicBackground">
                      <option value="other">Other</option>,<option value="indo-Pak">Indo-Pak</option>,
                      <option value="arab">Arab</option>,<option value="black">Black</option>,
                      <option value="white">White</option>,
                    </select>
                  )}
                </div>
                <div className="form-group">
                  {showDemographicStatus.data && showDemographicStatus.data.previouslyMarried === 'no' && (
                    <select className="custom-select custom-select-lg select-input" name="previouslyMarried">
                      <option value="no">Single</option>,<option value="once">Married</option>,
                      <option value="divorced">Divorced</option>,<option value="widowed">Widowed</option>
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.previouslyMarried === 'once' && (
                    <select className="custom-select custom-select-lg select-input" name="previouslyMarried">
                      <option value="once">Married</option>,<option value="no">Single</option>,
                      <option value="divorced">Divorced</option>,<option value="widowed">Widowed</option>
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.previouslyMarried === 'divorced' && (
                    <select className="custom-select custom-select-lg select-input" name="previouslyMarried">
                      <option value="divorced">Divorced</option>,<option value="no">Single</option>,
                      <option value="once">Married</option>,<option value="widowed">Widowed</option>
                    </select>
                  )}
                  {showDemographicStatus.data && showDemographicStatus.data.previouslyMarried === 'widowed' && (
                    <select className="custom-select custom-select-lg select-input" name="previouslyMarried">
                      <option value="widowed">Widowed</option>,<option value="no">Single</option>,
                      <option value="once">Married</option>,<option value="divorced">Divorced</option>
                    </select>
                  )}
                </div>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control select-input"
                    placeholder="Address"
                    defaultValue={showDemographicStatus.data && showDemographicStatus.data.address}
                    id="address"
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
                    placeholder="Phone"
                    defaultValue={showDemographicStatus.data && showDemographicStatus.data.telephone}
                    id="telInput"
                    name="telephone"
                  />
                  <span>
                    <i className="fa fa-lock demographics-lock-icon"></i>
                  </span>
                </div>
                <div className="text-center">
                  {updateDemographicStatus === true ? (
                    <Loader />
                  ) : (
                    <button type="submit" className="submit-btn">
                      Update
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      )}
    </div>
  )
}

export default withRouter(DemographicsEdit)
