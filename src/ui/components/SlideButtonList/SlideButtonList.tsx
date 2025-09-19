import "@src/ui/components/SlideButtonList/SlideButtonList.css";

interface SlideButtonListProps {
  index: number;
  handleSetIndex: (index: number) => void;
}

export const SlideButtonList = ({
  index,
  handleSetIndex,
}: SlideButtonListProps): JSX.Element => {
  return (
    <div className="slide-button-list">
      <button
        type="button"
        aria-label="item-0"
        onClick={() => handleSetIndex(0)}
        className={
          index === 0
            ? "slide-button-list__btn slide-button-list__btn--active"
            : "slide-button-list__btn"
        }
      ></button>
      <button
        type="button"
        aria-label="item-1"
        onClick={() => handleSetIndex(1)}
        className={
          index === 1
            ? "slide-button-list__btn slide-button-list__btn--active"
            : "slide-button-list__btn"
        }
      ></button>
      <button
        type="button"
        aria-label="item-2"
        onClick={() => handleSetIndex(2)}
        className={
          index === 2
            ? "slide-button-list__btn slide-button-list__btn--active"
            : "slide-button-list__btn"
        }
      ></button>
    </div>
  );
};
