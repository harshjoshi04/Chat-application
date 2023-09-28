import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
function SearchBar() {
  return (
    <div className="bg-search-input-container-background flex py-3 px-4  items-center gap-3 h-14">
      <div className="bg-panel-header-background flex gap-5 px-3 py-1 rounded-lg flex-grow ">
        <div className="pt-1">
          <BiSearch className="text-panel-header-icon cursor-pointer text-lg" />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search or Start a new chat"
            className="bg-transparent  text-sm focus:outline-none text-white w-full "
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
