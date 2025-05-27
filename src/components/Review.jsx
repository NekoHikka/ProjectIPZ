import defaultAvatar from "../assets/images/default-avatar-reviews.png";
import star from "../assets/images/star.svg";

const Review = () => {
  return (
    <div className="review-block">
      <div className="review-avatar-container">
        <img
          src={defaultAvatar}
          alt="default avatar"
          className="review-avatar"
        />
      </div>

      <div className="review-content">
        <div className="name-and-rating-block">
          <h1>Анонім</h1>
          <div className="starsReview">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={star}
                alt="rating"
                className="star-icon-review"
              />
            ))}
          </div>
        </div>

        <p className="review-text">Потужно!</p>
      </div>
    </div>
  );
};

export default Review;
