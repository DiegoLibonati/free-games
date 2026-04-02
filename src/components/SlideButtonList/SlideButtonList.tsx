import { SlideButtonListProps } from "@/types/props";

import "@/components/SlideButtonList/SlideButtonList.css";

const SlideButtonList = ({ index, handleSetIndex }: SlideButtonListProps) => {
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

export default SlideButtonList;
