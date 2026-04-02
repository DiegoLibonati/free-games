import { OptionFilterListItemProps } from "@/types/props";

import "@/components/OptionFilterListItem/OptionFilterListItem.css";

const OptionFilterListItem = ({ filter, handleClickFilter }: OptionFilterListItemProps) => {
  return (
    <li className="option-filter-list-item" onClick={() => handleClickFilter(filter)}>
      {filter}
    </li>
  );
};

export default OptionFilterListItem;
