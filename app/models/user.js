var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  twitter          : {
    id           : String,
    token        : String,
    tokenSecret  : String,
    displayName  : String,
    username     : String
  },
  owner          : {
    lastName     : String,
    email        : String,
    image        : String,
    startDate    : String,
    endDate      : String,
    info         : {
      pets          : Boolean,
      plants        : Boolean,
      updates       : Boolean,
      smoking       : Boolean,
      other         : Boolean
    }
  },
  traveller      : {
    lastName     : String,
    email        : String,
    image        : String,
    startDate    : String,
    endDate      : String,
    info         : {
      pets          : Boolean,
      plants        : Boolean,
      updates       : Boolean,
      smoking       : Boolean,
      other         : Boolean
    }
  }  
});

module.exports = mongoose.model('User', userSchema);


// owner:
//    { lastName: 'sam',
//      email: 'doo@you.coo',
//      location: 'fremont ca',
//      image: 'http://boobs.com',
//      info: { pets: false, noSmoking: true },
//      startDate: '2015-07-17T07:00:00.000Z',
//      endDate: '2016-05-24T07:00:00.000Z',
//      firstName: 'sheryl' }
