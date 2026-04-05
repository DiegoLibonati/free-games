import type { JSX } from "react";
import type { OptionFilterListItemProps } from "@/types/props";

import "@/components/OptionFilterListItem/OptionFilterListItem.css";

const OptionFilterListItem = ({
  filter,
  handleClickFilter,
}: OptionFilterListItemProps): JSX.Element => {
  return (
    <li
      className="option-filter-list-item"
      onClick={() => {
        handleClickFilter(filter);
      }}
    >
      {filter}
    </li>
  );
};

export default OptionFilterListItem;
