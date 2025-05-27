import defaultAvatar from "../assets/images/default-avatar.svg";
import star from "../assets/images/star.svg";
const Review = () => {
  return (
    <div className="review-block">
      <img src={defaultAvatar} alt="default avatar" className="review-avatar" />
      <div>
        <h1>В. Зеленський</h1>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <img key={i} src={star} alt="rating" className="star-icon" />
          ))}
        </div>
        <p>Потужно!</p>
      </div>
    </div>
  );
};

export default Review;
