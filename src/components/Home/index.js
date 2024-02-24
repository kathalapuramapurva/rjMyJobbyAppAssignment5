import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'
import Header from '../Header'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jo that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="home-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
