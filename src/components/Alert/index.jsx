// @flow
import React, { useState, useEffect } from "react";
import classNames from "classnames";

import "./styles.scss";

export const TYPE = {
  SUCCESS: "alert-success",
  ERROR: "alert-danger",
};

type AlertProps = {
  children: any,
  type: typeof TYPE.SUCCESS | typeof TYPE.ERROR,
};

const Alert = (props: AlertProps) => {
  const { children, type } = props;
  const [dismiss, dismissAlert] = useState(false);

  useEffect(() => {
    dismissAlert(false);
    const timeoutId = setTimeout(() => dismissAlert(true), 5000);
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  if (dismiss) {
    return null;
  }

  return (
    <div id="alert" className={classNames("alert", "full-width", type)}>
      <div className="alert-message">{children}</div>
    </div>
  );
};

Alert.TYPE = TYPE;

export default Alert;
