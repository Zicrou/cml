import React from 'react'
import { useHistory } from 'react-router-dom'
import readLocalStorage from '../../utils/readLocalStorage'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../../aws-exports'

Amplify.configure(awsconfig)
Auth.configure(awsconfig)

const LogoutButton: React.FC = () => {
  const history = useHistory()
  const logout = () => {
    Auth.signOut()
    localStorage.clear()
    window.location.replace('/login')
  }
  return (
    <>
      {' '}
      <div className="row">
        <div className="col-sm-12 col-md-8  col-lg-8"></div>
        {readLocalStorage('access-token') ? (
          <div className="col-sm-12 col-md-4 col-lg-4 logout-main">
            {' '}
            <div className="logout-btn">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default LogoutButton
