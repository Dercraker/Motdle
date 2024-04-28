import moment from "moment";

export const MotdleConfig = {
  nbRows: 6,
  nbColumns: 5,
  resetDate: moment().utc(true).startOf("day").add(1, "days"),
};
