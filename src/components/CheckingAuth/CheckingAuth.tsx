import type { JSX } from "react";

import "@/components/CheckingAuth/CheckingAuth.css";

const CheckingAuth = (): JSX.Element => {
  return (
    <div className="loader-wrapper">
      <div className="loader-wrapper__auth"></div>
    </div>
  );
};

export default CheckingAuth;
