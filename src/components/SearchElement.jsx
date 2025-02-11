const SearchElement = () => {
  return (
    <div className="my-2 md:m-3">
      <form className="flex items-center">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </form>
    </div>
  );
};

export default SearchElement;
