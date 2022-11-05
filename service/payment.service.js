const Razorpay = require('razorpay');

async function createPaymentLink() {
  const instance = new Razorpay({key_id: 'rzp_test_wTBzMtXjLX8JOz', key_secret: 'isNnyJxP7xkI2DeJWINtxtzG'});

  console.log(100);

  instance.paymentLink.create({
    amount: 500,
    currency: 'INR',
    accept_partial: true,
    first_min_partial_amount: 100,
    description: 'For XYZ purpose',
    customer: {
      name: 'Gaurav Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '+919999999999',
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    notes: {
      policy_name: 'Jeevan Bima',
    },
    callback_url: 'https://google.com/',
    callback_method: 'get',
  }).then((res));

  instance.paymentLink.fetch(paymentLinkId);
}

module.exports = {
  createPaymentLink,
};
