import React from "react";
import { injectIntl, intlShape } from "react-intl";

const ChildComponent = ({ intl }) => {
  const placeholder = intl.formatMessage({ id: "messageId" });
  return <input placeholder={placeholder} />;
};

ChildComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ChildComponent);
