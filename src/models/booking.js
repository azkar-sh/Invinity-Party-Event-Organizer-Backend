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
        .eq("userId", id)
        // .select(`*, event(name, location, dateTimeShow)`)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateBooking: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .update(data)
        .eq("bookingId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteBooking: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .delete(data)
        .eq("bookingId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(resolve);
          }
        });
    }),
  getBookingSection: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .select(`*, bookingSection(section)`)
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(resolve);
          }
        });
    }),
};
