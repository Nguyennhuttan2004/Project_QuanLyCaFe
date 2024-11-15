const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Ae75Cbmj2sqPnfRgm2bryHHbCMCXS_KhbMKHTUwjTxinKhqYK-KFexUd9Sc5lUMHid8jptfOuMU8fXNK",
  client_secret: "ELKiR-q-unZpCotIkjoPfwY1eXJkSR_qkNEAnM5HODPcIjOwRS1fmelK-LH90UUSGbc0MYsOEmtEaHHz",
});

module.exports = paypal;
