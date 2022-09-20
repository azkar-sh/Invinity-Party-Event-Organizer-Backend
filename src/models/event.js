const supabase = require("../config/supabase");

module.exports = {
  getCountEvent: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllEvent: (offset, limit, name, sortColumn, sortType, day, nextDay) =>
    new Promise((resolve, reject) => {
      const req = supabase
        .from("event")
        .select("*")
        .range(offset, offset + limit - 1)
        .ilike("name", `%${name}%`)
        .order(sortColumn, { ascending: sortType });
      if (day) {
        req
          .gt("dateTimeShow", `${day.toISOString()}`)
          .lt("dateTimeShow", `${nextDay.toISOString()}`)
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          });
      } else {
        req.then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
      }
      // .gt("dateTimeShow", `${day.toISOString()}`)
      // .lt("dateTimeShow", `${nextDay.toISOString()}`)
    }),

  getEventById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*")
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createEvent: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateEvent: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .update(data)
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteEvent: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .delete(data) // ()
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
