import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiRoundStar} from 'react-icons/gi'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import SimilarJob from '../SimilarJob'

const allAPIJobItemUrl = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiJobItemUrl: allAPIJobItemUrl.initial,
    jobItemDetails: {},
    skillsList: [],
    similarJobsList: [],
  }

  componentDidMount() {
    this.renderJobItemDetails()
  }

  renderJobItemDetails = async () => {
    this.setState({apiJobItemUrl: allAPIJobItemUrl.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsDetailsList = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
        packagePerAnnum: data.job_details.package_per_annum,
        jobDescription: data.job_details.job_description,
        lifeAtCompanyDesc: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
      }
      const updatedSkillsList = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        title: eachJob.title,
        rating: eachJob.rating,
        location: eachJob.location,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
        jobDescription: eachJob.job_description,
      }))

      this.setState({
        jobItemDetails: updatedJobsDetailsList,
        skillsList: updatedSkillsList,
        similarJobsList: updatedSimilarJobs,
        apiJobItemUrl: allAPIJobItemUrl.success,
      })
    } else {
      this.setState({apiJobItemUrl: allAPIJobItemUrl.failure})
    }
  }

  getAllJobItemDetails = () => {
    const {jobItemDetails, skillsList, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      lifeAtCompanyDesc,
      lifeAtCompanyImageUrl,
    } = jobItemDetails
    return (
      <>
        <div className="each-job-details-container">
          <div className="logo-type-rating-container">
            <img
              className="job-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="type-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="star-rating-container">
                <GiRoundStar className="style-star" />
                <p className="style-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-internship-lpa-container">
            <div className="location-internship-container">
              <IoLocationSharp className="location-icon" />
              <p className="location-name">{location}</p>
              <IoBag className="location-icon" />
              <p className="location-name">{employmentType}</p>
            </div>
            <p className="style-package">{packagePerAnnum}</p>
          </div>
          <hr className="style-jobs-line" />
          <div className="description-link-container">
            <h1 className="style-package">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              Visit
              <FaExternalLinkAlt className="visit-icon" />
            </a>
          </div>

          <p className="job-description">{jobDescription}</p>

          <h1 className="style-package">Skills</h1>
          <ul className="skills-container">
            {skillsList.map(eachSkill => (
              <li className="each-skill" key={eachSkill.name}>
                <img
                  className="skill-image"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <h1 className="each-skill-name">{eachSkill.name}</h1>
              </li>
            ))}
          </ul>
          <div className="life-at-image-container">
            <div className="life-at-company-content">
              <h1 className="style-package">Life at Company</h1>
              <p className="job-description">{lifeAtCompanyDesc}</p>
            </div>
            <img
              className="life-at-company-image"
              src={lifeAtCompanyImageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="job-title">Similar Jobs</h1>

        <ul className="similar-jobs-container">
          {similarJobsList.map(similarJob => (
            <SimilarJob key={similarJob.id} similarJobDetails={similarJob} />
          ))}
        </ul>
      </>
    )
  }

  getAllJobItemLoader = () => (
    <div className="loader-container job-item-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobs = () => this.renderJobItemDetails()

  getJobItemFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        className="jobs-failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="jobs-retry-btn" onClick={this.retryJobs}>
        Retry
      </button>
    </div>
  )

  getSwitchJobItemDetails = () => {
    const {apiJobItemUrl} = this.state
    switch (apiJobItemUrl) {
      case allAPIJobItemUrl.success:
        return this.getAllJobItemDetails()
      case allAPIJobItemUrl.inProgress:
        return this.getAllJobItemLoader()
      case allAPIJobItemUrl.failure:
        return this.getJobItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.getSwitchJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
