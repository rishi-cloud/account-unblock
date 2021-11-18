import { LOCALES } from "../constants";

const en = {
  [LOCALES.ENGLISH]: {
    nameorderswap: true,
    OptinFields: {
      VirusThreats: {
        id: "1",
        display: "false",
        checked: "true",
      },
      SpecialPromo: {
        id: "2",
        display: "false",
        checked: "true",
      },
      PartnerPromo: {
        id: "3",
        display: "false",
        checked: "true",
      },
    },
    affiliates: {
      105: {
        OptinFields: {
          VirusThreats: {
            id: "1",
            display: "true",
            checked: "true",
          },
          SpecialPromo: {
            id: "2",
            display: "true",
            checked: "false",
          },
          PartnerPromo: {
            id: "3",
            display: "true",
            checked: "true",
          },
        },
        nameorderswap: false,
      },
      741: {
        OptinFields: {
          VirusThreats: {
            id: "1",
            display: "false",
            checked: "true",
          },
          SpecialPromo: {
            id: "2",
            display: "false",
            checked: "true",
          },
          PartnerPromo: {
            id: "3",
            display: "false",
            checked: "true",
          },
        },
      },
    },
  },
};
export default en;
