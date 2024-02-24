import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import EachJobDetails from '../EachJobDetails'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const allAPIJobsUrl = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentTypeList: [],
    minimumPackage: '',
    jobsList: [],
    apiJobUrl: allAPIJobsUrl.initial,
  }

  componentDidMount() {
    this.jobsAPIRequest()
  }

  jobsAPIRequest = async () => {
    this.setState({apiJobUrl: allAPIJobsUrl.inProgress})
    const {searchInput, employmentTypeList, minimumPackage} = this.state
    const employmentTypeValues = employmentTypeList.join()

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeValues}&minimum_package=${minimumPackage}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedJobsList = data.jobs.map(eachJob => ({
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
        jobsList: updatedJobsList,
        apiJobUrl: allAPIJobsUrl.success,
      })
    } else {
      this.setState({apiJobUrl: allAPIJobsUrl.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchAPICAll = () => this.jobsAPIRequest()

  onCheckingEmploymentType = event => {
    const {checked, id} = event.target

    if (checked === true) {
      this.setState(
        prevState => ({
          employmentTypeList: [...prevState.employmentTypeList, id],
        }),
        this.jobsAPIRequest,
      )
    }
  }

  onCheckingSalaryRange = event => {
    const {checked, id} = event.target

    if (checked === true) {
      this.setState({minimumPackage: id}, this.jobsAPIRequest)
    }
  }

  getAllJobDetails = () => {
    const {jobsList} = this.state
    return (
      <ul className="all-jobs-container">
        {jobsList.length === 0 && (
          <div className="jobs-failure-view-container">
            <img
              className="jobs-failure-view-image"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="jobs-failure-view-heading">No Jobs Found</h1>
            <p className="jobs-failure-view-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
        {jobsList.length !== 0 &&
          jobsList.map(eachJob => (
            <EachJobDetails key={eachJob.id} jobDetails={eachJob} />
          ))}
      </ul>
    )
  }

  getAllJobLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryJobsButton = () => {
    this.setState(
      {
        searchInput: '',
        employmentTypeList: [],
        minimumPackage: '',
        jobsList: [],
        apiJobUrl: allAPIJobsUrl.initial,
      },
      this.jobsAPIRequest,
    )
  }

  getJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        className="jobs-failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-view-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-retry-btn"
        onClick={this.retryJobsButton}
      >
        Retry
      </button>
    </div>
  )

  getSwitchJobsAPIUrl = () => {
    const {apiJobUrl} = this.state
    switch (apiJobUrl) {
      case allAPIJobsUrl.success:
        return this.getAllJobDetails()
      case allAPIJobsUrl.inProgress:
        return this.getAllJobLoader()
      case allAPIJobsUrl.failure:
        return this.getJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-content-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            {/* eslint-disable-next-line */}
            <button
              className="search-button"
              type="button"
              data-testid="searchButton"
              onClick={this.searchAPICAll}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="starting-container">
            <ProfileDetails />
            <hr className="style-line" />
            <h1 className="list-heading">Type of Employment</h1>
            <ul className="list-of-options">
              {employmentTypesList.map(eachType => (
                <li
                  key={eachType.employmentTypeId}
                  className="each-list-option"
                >
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    onChange={this.onCheckingEmploymentType}
                  />
                  <label
                    htmlFor={eachType.employmentTypeId}
                    className="each-option-heading"
                  >
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="style-line" />
            <h1 className="list-heading">Salary Range</h1>
            <ul className="list-of-options">
              {salaryRangesList.map(eachSalary => (
                <li key={eachSalary.salaryRangeId} className="each-list-option">
                  <input
                    type="radio"
                    id={eachSalary.salaryRangeId}
                    onChange={this.onCheckingSalaryRange}
                  />
                  <label
                    htmlFor={eachSalary.salaryRangeId}
                    className="each-option-heading"
                  >
                    {eachSalary.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="jobs-api-switch-container">
            <div className="search-container-desktop">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              {/* eslint-disable-next-line */}
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                onClick={this.searchAPICAll}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getSwitchJobsAPIUrl()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
