import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { OptionFilterListItem } from "@src/games/components/games/OptionFilterListItem/OptionFilterListItem";

import "@src/games/components/games/OptionFilter/OptionFilter.css";

interface OptionFilterProps {
  name: string;
  isOpen: boolean;
  arr: string[];
  handleClickFilter: (value: string) => void;
  handleClickOpenAndClose: React.MouseEventHandler<HTMLDivElement>;
}

export const OptionFilter = ({
  name,
  isOpen,
  arr,
  handleClickFilter,
  handleClickOpenAndClose,
}: OptionFilterProps): JSX.Element => {
  return (
    <article className="option-filter">
      <div className="option-filter__header" onClick={handleClickOpenAndClose}>
        <h3 className="option-filter__name">{name}</h3>
        {!isOpen && (
          <button
            type="button"
            aria-label="open filter"
            className="option-filter__btn-open"
          >
            <FaChevronDown className="option-filter__icon"></FaChevronDown>
          </button>
        )}
        {isOpen && (
          <button
            type="button"
            aria-label="close filter"
            className="option-filter__btn-close"
          >
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
