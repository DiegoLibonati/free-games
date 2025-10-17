import { OptionFilterListItemProps } from "@src/entities/props";

import "@src/components/OptionFilterListItem/OptionFilterListItem.css";

export const OptionFilterListItem = ({
  filter,
  handleClickFilter,
}: OptionFilterListItemProps): JSX.Element => {
  return (
    <li
      className="option-filter-list-item"
      onClick={() => handleClickFilter(filter)}
    >
      {filter}
    </li>
  );
};
