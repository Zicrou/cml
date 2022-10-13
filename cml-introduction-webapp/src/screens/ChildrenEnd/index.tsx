import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const ChildrenEnd: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="cml-logo-title">
              <div className="children-end-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="children-end-header-text">
              <div className="children-end-heading-1">
                <b>Congratulations!</b>
              </div>
              <div className="children-end-sub-heading-1">
                <p>
                  You just completed the children section of the compatibility quiz! There are one more sections of the
                  quiz. You can complete them now or return later to complete them.
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="progress children-end-progress">
                <div
                  className="children-end-progress-bar"
                  id="myBar"
                  role="progressbar"
                  aria-valuenow={70}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
                <div className="children-end-headings">
                  <div className="children-progress-text1">lifestyle</div>
                  <div className="children-progress-text2">Relationship</div>
                  <div className="children-progress-text3">Finance</div>
                  <div className="children-progress-text4">Children</div>
                  <div className="children-progress-text5">Personal</div>
                </div>
              </div>
            </div>

            <div className="children-end-lets-go-btns">
              <a href="/children-existing">
                <input type="button" value="Back" className="back-button-style1" />
              </a>
              <Link to="/demographics">
                <button>Lets Go!</button>
              </Link>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>{' '}
    </>
  )
}

export default ChildrenEnd
