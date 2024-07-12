import { Schema, model, models } from 'mongoose';

const PaymentSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  message: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  }
});

const Payment = models.Payment || model('Payment', PaymentSchema);

export default Payment;
