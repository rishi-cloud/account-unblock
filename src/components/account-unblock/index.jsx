import React from "react";
import AccountUnblockContainer from "../../containers/AccountUnblockContainer";
import AccountUnblockUI from "./AccountUnblockUI";

function AccountUnblock(props) {
  return (
    <AccountUnblockContainer {...props}>
      <AccountUnblockUI />
    </AccountUnblockContainer>
  );
}

export default AccountUnblock;
