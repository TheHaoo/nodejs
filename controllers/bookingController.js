const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Tour = require("../models/tourModel");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currenlty bookied tour
  const tour = await Tour.findById(req.params.tourId)

  // 2) Create chockout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      // {
      //   name: `${tour.name} Tour`,
      //   description: tour.summary,
      //   images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
      //   amount: tour.price * 100,
      //   currency: 'usd',
      //   quantity: 1
      // }
      {
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: tour.price * 100,
            product_data: {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            },
        },
      },
    ],
    mode: 'payment'
  })

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  })
})
