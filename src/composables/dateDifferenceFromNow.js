import { myMoment } from "src/boot/moment";

export function dateDifferenceFromNow(dateString) {
  return myMoment(dateString).calendar({
    sameDay: "[Hoy]",
    lastDay: "[Ayer]",
    lastWeek: "dddd",
    sameElse: "DD/MM/YYYY",
  });
}
