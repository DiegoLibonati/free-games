import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { OptionFilterProps } from "@/types/props";

import OptionFilterListItem from "@/components/OptionFilterListItem/OptionFilterListItem";

import "@/components/OptionFilter/OptionFilter.css";

const OptionFilter = ({
  name,
  isOpen,
  arr,
  handleClickFilter,
  handleClickOpenAndClose,
}: OptionFilterProps) => {
  return (
    <article className="option-filter">
      <div className="option-filter__header" onClick={handleClickOpenAndClose}>
        <h3 className="option-filter__name">{name}</h3>
        {!isOpen && (
          <button type="button" aria-label="open filter" className="option-filter__btn-open">
            <FaChevronDown className="option-filter__icon"></FaChevronDown>
          </button>
        )}
        {isOpen && (
          <button type="button" aria-label="close filter" className="option-filter__btn-close">
            <FaChevronUp className="option-filter__icon"></FaChevronUp>
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="option-filter__list">
          {arr.map((option) => (
            <OptionFilterListItem
              key={option}
              filter={option}
              handleClickFilter={handleClickFilter}
            ></OptionFilterListItem>
          ))}
        </ul>
      )}
    </article>
  );
};

export default OptionFilter;
