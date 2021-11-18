import React from "react";
import { FormattedMessage } from "react-intl";

const translate = (id, defaultMessage, value = {}) => (
  <FormattedMessage
    id={id}
    defaultMessage={defaultMessage}
    values={{ ...value }}
  />
);

export default translate;
