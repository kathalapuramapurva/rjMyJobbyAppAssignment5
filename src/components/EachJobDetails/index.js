import {GiRoundStar} from 'react-icons/gi'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import './index.css'

const EachJobDetails = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <li className="each-job-details-container">
      <Link to={`/jobs/${id}`} className="style-link">
        <div className="logo-type-rating-container">
          <img
            className="job-company-logo"
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="style-package">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default EachJobDetails
