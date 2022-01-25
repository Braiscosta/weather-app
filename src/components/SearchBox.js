const SearchBox = ({query, search, setQuery  }) => {
    return (
        <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="El tiempo en..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </div>
    );
  };
  
  export default SearchBox;