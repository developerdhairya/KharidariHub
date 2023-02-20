const Razorpay = require('razorpay');

const instance = new Razorpay({ key_id: process.env.rzp_key_id, key_secret: process.env.rzp_key_secret });


async function createPaymentLink(amount, email) {


  const response = await instance.paymentLink.create({
    amount: amount,
    currency: 'INR',
    accept_partial: false,
    first_min_partial_amount: 0,
    description: 'For order at Kharidari Hub',
    customer: {
      name: 'null',
      email: email,
      contact: '+918295314421',
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

async function verifyPayment(paymentId) {
  return instance.paymentLink.fetch(paymentId);
}

module.exports = {
  createPaymentLink,
  verifyPayment
};
