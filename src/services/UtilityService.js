export default class UtilityService {

    //Format the date to provide time in 12-hr format.

    /*@param  dt=> datetime
      returns time in 12 hour format
     */
    dateFormatter(dt) {
        let dt_arr = dt.split('T');
        let dt_date = dt_arr[0];
        let dt_time = dt_arr[1];
        let dt_time_arr = dt_time.split(':');
        let dt_time_hr = parseInt(dt_time_arr[0]);
        let dt_time_min = parseInt(dt_time_arr[1]);
        let dt_time_suffix = 'AM';
        if (dt_time_hr > 12) {
            dt_time_hr -= 12;
            dt_time_suffix = 'PM';
        }
        if (dt_time_hr === 12) {
            dt_time_suffix = 'PM';
        }
        let time = dt_time_hr + ':' + dt_time_min + dt_time_suffix;
        return time;
    }
}