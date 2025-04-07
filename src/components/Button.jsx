const Button = ({ value, fOnClick, typeButton }) => {
  return (
    <button type={typeButton} onClick={fOnClick} className="primary-button">
      {value}
    </button>
  );
};

export default Button;
