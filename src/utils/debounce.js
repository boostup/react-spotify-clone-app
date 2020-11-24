/**
 * debounce function
 * use inDebounce to maintain internal reference of timeout to clear
 *
 * https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 * https://codepen.io/b00stup/pen/zYKOOqw?editors=0010
 */
export const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
