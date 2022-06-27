const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
  storeName: String,
  phoneNumber:String,
  address:{},
  openStatusText:String,
  addressLines: Array,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }

});

module.exports = mongoose.model('Store',storeSchema);
