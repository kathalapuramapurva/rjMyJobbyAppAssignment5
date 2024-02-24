import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class ProfileDetails extends Component {
  state = {
    profileDetails: {},
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.apiProfileUrl()
  }

  apiProfileUrl = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setState({
        profileDetails: {
          name: fetchedData.profile_details.name,
          profileImageUrl: fetchedData.profile_details.profile_image_url,
          shortBio: fetchedData.profile_details.short_bio,
        },
      })
      this.setState({apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  getProfileLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  onClickRetryProfile = () => {
    this.setState(
      {profileDetails: {}, apiStatus: 'INITIAL'},
      this.apiProfileUrl,
    )
  }

  getProfileFailure = () => (
    <button
      type="button"
      className="home-btn"
      onClick={this.onClickRetryProfile}
    >
      Retry
    </button>
  )

  getSwitchProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.getProfileDetails()
      case 'INPROGRESS':
        return this.getProfileLoader()
      case 'FAILURE':
        return this.getProfileFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-api-container">
        {this.getSwitchProfileDetails()}
      </div>
    )
  }
}

export default ProfileDetails
