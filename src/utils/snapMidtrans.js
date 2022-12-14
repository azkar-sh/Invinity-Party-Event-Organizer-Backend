const snapMidtrans = require("../config/midtrans");

module.exports = {
  post: (data) =>
    new Promise((resolve, reject) => {
      const parameter = {
        transaction_details: {
          order_id: data.bookingId,
          gross_amount: data.totalPayment,
        },
        credit_card: {
          secure: true,
        },
      };

      snapMidtrans
        .createTransaction(parameter)
        .then((transaction) => {
          const redirectUrl = transaction.redirect_url;
          console.log("redirectUrl:", redirectUrl);
          resolve(transaction);
        })
        .catch((error) => reject(error));
    }),
  notif: (data) =>
    new Promise((resolve, reject) => {
      snapMidtrans.transaction
        .notification(data)
        .then((statusResponse) => {
          resolve(statusResponse);
        })
        .catch((error) => {
          reject(error);
        });
    }),
};
