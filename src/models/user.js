const supabase = require("../config/supabase"); // variabel database

module.exports = {
  // showGreetings: () => new Promise((resolve, reject) => {}),
  getAllUser: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .select("*")
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getUserById: (userId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .select("*")
        .eq("userId", userId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createUser: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateUser: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .update(data)
        .eq("userId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteUser: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .delete(data)
        .eq("userId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(resolve);
          }
        });
    }),
};
