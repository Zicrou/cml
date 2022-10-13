import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const UPDATE_DEMOGRAPHICS_SUCCESS = 'UPDATE_DEMOGRAPHICS_SUCCESS'
export const UPDATE_DEMOGRAPHICS_ERROR = 'UPDATE_DEMOGRAPHICS_ERROR'
export const UPDATE_DEMOGRAPHICS_REQUEST = 'UPDATE_DEMOGRAPHICS_REQUEST '

interface demographicsProps {
  address: string
  denomination: string
  dob: string
  ethnicBackground: string
  name: string
  telephone: string
  imgObj: string
  previouslyMarried: string
}

export const updateDemographics = (demographics: demographicsProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  demographics.address && data.append('demographic[address]', demographics.address)
  demographics.denomination && data.append('demographic[denomination]', demographics.denomination)
  demographics.dob && data.append('demographic[dateOfBirth]', demographics.dob)
  demographics.ethnicBackground && data.append('demographic[ethnicBackground]', demographics.ethnicBackground)
  demographics.name && data.append('demographic[personName]', demographics.name)
  demographics.telephone && data.append('demographic[telephone]', demographics.telephone)
  data.append('demographic[demographicImage]', demographics.imgObj)

  data.append('demographic[citizenshipStatus]', 'us-citizen')
  data.append('demographic[divorced]', 'yes')
  data.append('demographic[highestEducation]', 'undergraduate-degree')
  data.append('demographic[occupation]', 'agb')
  demographics.previouslyMarried && data.append('demographic[previouslyMarried]', demographics.previouslyMarried)

  dispatch({ type: UPDATE_DEMOGRAPHICS_REQUEST })
  axios({
    method: 'put',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/me/demographic`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      return dispatch({
        type: UPDATE_DEMOGRAPHICS_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      return dispatch({
        type: UPDATE_DEMOGRAPHICS_ERROR,
        payload: error.response
      })
    })
}


