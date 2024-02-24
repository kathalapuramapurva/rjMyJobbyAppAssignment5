import {GiRoundStar} from 'react-icons/gi'
import {IoLocationSharp, IoBag} from 'react-icons/io5'
import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarJobDetails
  return (
    <li className="each-job-details">
      <div className="logo-type-rating-container">
        <img
          className="job-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="type-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="star-rating-container">
            <GiRoundStar className="style-star" />
            <p className="style-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="style-package">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-internship-container">
        <IoLocationSharp className="location-icon" />
        <p className="location-name">{location}</p>
        <IoBag className="location-icon" />
        <p className="location-name">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJob
