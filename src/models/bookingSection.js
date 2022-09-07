const supabase = require("../config/supabase");

module.exports = {
  getAllBookingSection: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .select(`*`)
        // .select(`*, event(name, location, dateTimeShow)`)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createBookingSection: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getBookingSectionById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .select(`*, booking(*)`)
        .eq("bookingId", id)
        // .select(`*, event(name, location, dateTimeShow)`)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
