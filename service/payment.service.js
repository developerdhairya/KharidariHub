const Razorpay = require('razorpay');

async function createPaymentLink(amount) {
  const instance = new Razorpay({key_id: 'rzp_test_wTBzMtXjLX8JOz', key_secret: 'isNnyJxP7xkI2DeJWINtxtzG'});

  const response = await instance.paymentLink.create({
    amount: amount,
    currency: 'INR',
    accept_partial: false,
    first_min_partial_amount: 100,
    description: 'For order at Kharidari Hub',
    customer: {
      name: 'null',
      email: 'null',
      contact: 'null',
    },
    notify: {
      sms: true,
      email: true,
    },
    reminder_enable: true,
    notes: {},
    callback_url: 'https://google.com/',
    callback_method: 'get',
  });

  return {
    paymentId: response.id,
    paymentUrl: response.short_url,
  };
}

module.exports = {
  createPaymentLink,
};
// instance.paymentLink.fetch(paymentLinkId);
