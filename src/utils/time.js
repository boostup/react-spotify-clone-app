/**
 * Get the time now, and adds it n amount of milliseconds.
 *
 * @param {int} miliseconds
 * @return {int} miliseconds
 */
export const addSecondsToNow = (seconds) =>
  new Date().getTime() + seconds * 1000;

/**
 *
 * @param {int} miliseconds
 * @param {string} format -> possible values =>
 * "s" => for seconds
 * "m" => for minutes
 * "h" => for hours
 * "d" => for days
 * )
 * @return {Object}
 * => example of returned object when not specifying any format : { d: days, h: hours, m: minutes, s: seconds }
 */
export function convertMiliseconds(miliseconds, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch (format) {
    case "s":
      return total_seconds;
    case "m":
      return total_minutes;
    case "h":
      return total_hours;
    case "d":
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
}

/**
 *
 * @param {int} timeInMiliseconds
 * @return {boolean}
 */
export const isPast = (timeInMiliseconds) =>
  timeInMiliseconds < new Date().getTime();

/**
 *
 * @param {int} timeInMiliseconds
 */

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
