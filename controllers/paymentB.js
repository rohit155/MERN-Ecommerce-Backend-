var braintree = require("braintree");

// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "dyh5qtx2pjzg75y8",
//   publicKey: "rw8zm5tp6b3r8qf2",
//   privateKey: "0aacaf2968e7ec67281f30c5b9f6c5bf",
// });

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "dyh5qtx2pjzg75y8",
  publicKey: "rw8zm5tp6b3r8qf2",
  privateKey: "0aacaf2968e7ec67281f30c5b9f6c5bf",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.nonceFromTheClient;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
