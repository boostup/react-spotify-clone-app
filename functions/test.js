const formattedReturn = require("./helpers/formattedReturn");

exports.handler = async (event) => {
  try {
    const formattedCourses = { some: "response" };
    return formattedReturn(200, formattedCourses);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
