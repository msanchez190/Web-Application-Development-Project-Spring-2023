const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)

// collection for clients
const clientDataSchema = new Schema({
    _id: { 
      type: String,
      default: uuid.v1
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    orgs: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'client',
    timestamps: true
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: String
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: String,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'event'
  }
)

//collection for services
const serviceDataSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v1,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status:{
      type: String, //validate in front end to take Active or Inactive only
      required:true
    },
    org: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      //validate: [(org) => org.length > 0, 'needs at least one org']//was going to validate, but each org may have it active
      //or inactive at different times
    }
  },
  {
    collection: 'service'
  }
)

//collection for users
const userDataSchema = new Schema(
  {
    _id: { //decided to add it just in case we needed it down the line
      type: String,
      default: uuid.v1,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password:{
      type:String,
      required:true
    },
    org: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      //validate: [(org) => org.length > 0, 'needs at least one org'], each orgs may have different users for same person
    }
  },
  {
    collection: 'user'
  }
)

// hash the password
userDataSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userDataSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create models from mongoose schemas
const clients = mongoose.model('client', clientDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('event', eventDataSchema)
const services = mongoose.model('service',serviceDataSchema)
const users = mongoose.model('user',userDataSchema)

// package the models in an object to export
module.exports = { clients, orgs, events, services, users }
