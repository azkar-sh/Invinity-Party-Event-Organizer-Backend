const express = require("express");

const app = express();

const admin = require("firebase-admin");

const serviceAccount = require();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/payment", (req, res) => {
  const dataUser = {
    fullName: "dwiki setyawan",
  };

  const dataTransaction = {
    amount: "Rp 5000",
  };

  const condition = "'stock-GOOG' in topics || 'industry-tech' in topics";

  const message = {
    notification: {
      title: `payment success, kamu udah ngirim ke ${dataUser.fullName}`,
      body: `kamu mengirim sebesar${dataTransaction.amount}.`,
    },
    condition,
  };

  // Send a message to devices subscribed to the combination of topics
  // specified by the provided condition.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});
