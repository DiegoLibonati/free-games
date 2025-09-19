import "@src/games/components/games/OptionFilterListItem/OptionFilterListItem.css";

interface OptionFilterListItemProps {
  filter: string;
  handleClickFilter: (value: string) => void;
}

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
