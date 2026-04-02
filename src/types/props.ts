import { Game } from "@/types/app";

interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

export type HeaderPresentationProps = DefaultProps;

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
  id: number;
  thumbnail: string;
  title: string;
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
  id: number;
  thumbnail: string;
  title: string;
}

export interface DiskGameProps {
  id: number;
  title: string;
  short_description: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  thumbnail: string;
}
