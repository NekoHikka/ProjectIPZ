const Button = ({ value, typeButton }) => {
  return (
    <button type={typeButton} className="primary-button">
      {value}
    </button>
  );
};

export default Button;
