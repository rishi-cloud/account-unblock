import React, { useContext } from "react";
import { CommonDataContext } from "../../providers/CommonDataContext";
import translate from "../../localization/translate";
const SocialButtons = (props) => {
    const { socialBtn } = props;
    const { connections } = useContext(CommonDataContext);

    const socialIcons = connections.filter(
        (item) => item.name !== "email" && item.name !== "auth0"
    );
    return (
        <>
            {socialIcons.length > 0 && (
                <div className="SocialBtnContainer">
                    <div> {translate("or_Signin_with")}</div>
                    <div className="SocialBtnWrapper">
                        {socialIcons.map((item) => {
                            return (
                                <div key={item.name}>
                                    <div
                                        key={item.name}
                                        className="SocialIcons"
                                    >
                                        <button
                                            onClick={() => socialBtn(item.name)}
                                            className="SocialBtn"
                                        >
                                            {item.name}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default SocialButtons;
