import search from "../assets/images/search.png";
import { useSearch } from "../utils/SearchContext";

const Search = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Що ви хочете замовити сьогодні..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="search-icon">
        <img src={search} alt="search" />
      </span>
    </div>
  );
};

export default Search;
