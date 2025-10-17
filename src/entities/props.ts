import { Game } from "@src/entities/app";

interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

export interface HeaderPresentationProps extends DefaultProps {}

export interface InputFormProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  name: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SlideButtonListProps {
  index: number;
  handleSetIndex: (index: number) => void;
}

export interface CardFavoriteGameProps {
  game: Game;
}

export interface OptionFilterProps {
  name: string;
  isOpen: boolean;
  arr: string[];
  handleClickFilter: (value: string) => void;
  handleClickOpenAndClose: React.MouseEventHandler<HTMLDivElement>;
}

export interface OptionFilterListItemProps {
  filter: string;
  handleClickFilter: (value: string) => void;
}

export interface CarouselGamesProps {
  name: string;
  games: Game[];
}

export interface UpcomingGameProps {
  img: string;
  name: string;
  release_date: string;
}

export interface CardGameProps {
  game: Game;
}

export interface DiskGameProps {
  game: Game;
}
