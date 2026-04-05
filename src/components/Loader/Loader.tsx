import type { JSX } from "react";

import "@/components/Loader/Loader.css";

const Loader = (): JSX.Element => {
  return (
    <div className="loader-all-wrapper">
      <div className="loader-all"></div>
    </div>
  );
};

export default Loader;
