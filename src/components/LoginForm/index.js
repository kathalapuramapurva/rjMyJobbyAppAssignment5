import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="login-form-container">
          <img
            className="style-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            <label className="style-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="style-input"
              id="username"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
              type="text"
            />
            <label className="style-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="style-input"
              id="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
              type="password"
            />
            <button type="submit" className="login-submit-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
