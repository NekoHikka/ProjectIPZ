import search from "../assets/images/search.png";
const Search = () => {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Що ви хочете замовити сьогодні..."
      />
      <span className="search-icon">
        <img src={search} alt="search" />
      </span>
    </div>
  );
};

export default Search;
