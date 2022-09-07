const supabase = require("../config/supabase");

module.exports = {
  getAllBooking: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
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
  createBooking: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getBookingById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .select(`*, bookingSection(*)`)
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
