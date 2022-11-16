const supabase = require("../config/supabase");

module.exports = {
  getCountWishlist: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllWishlist: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(`*`)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  // getAllWishlist: (offset, limit, userId) =>
  //   new Promise((resolve, reject) => {
  //     supabase
  //       .from("wishlist")
  //       .select(`*, event(*)`)
  //       .range(offset, offset + limit - 1)
  //       .eq("userId", userId)
  //       .then((result) => {
  //         if (!result.error) {
  //           resolve(result);
  //         } else {
  //           reject(result);
  //         }
  //       });
  //   }),
  // searchWishlist: (name) =>
  //   new Promise((resolve, reject) => {
  //     supabase
  //       .from("wishlist")
  //       .select("*")
  //       .textSearch("name", name)
  //       .then((result) => {
  //         if (!result.error) {
  //           resolve(result);
  //         } else {
  //           reject(result);
  //         }
  //       });
  //   }),
  getWishlistById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select("*")
        .eq("wishlistId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getWishlistByUserId: (userId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(`*, event(name, price, detail, location, dateTimeShow)`)
        .eq("userId", userId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getWishlistByEventId: (eventId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select("*")
        .eq("eventId", eventId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createWishlist: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateWishlist: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .update(data)
        .eq("wishlistId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteWishlist: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .delete(data)
        .eq("wishlistId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(resolve);
          }
        });
    }),
};
