import { boot } from "quasar/wrappers";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/es";
moment.updateLocale("es", localization);
moment.locale("es");
const myMoment = moment;

export { myMoment };

export default boot(async (/* { app, router, ... } */) => {});
