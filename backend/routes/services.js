const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

//get all services
router.get('/', (req, res, next) => {
    services
      .find({ orgs: org }, (error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.json(data)
        }
      })
      .sort({ name: 1 }) //sort alphabetically
  })


// GET single service by ID
router.get('/id/:id', (req, res, next) => {
    // use findOne instead of find to not return array
    services.findOne({ _id: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else if (!data) {
        res.status(400).send('Service not found')
      } else {
        res.json(data)
      }
    })
  })

// GET single service by name
router.get('/name/:name', (req, res, next) => {
    // use findOne instead of find to not return array
    services.findOne(
        { name: 
            {$regex: req.params.name,
             $options: 'i'} //checks for case insensitive
        , org: org  },
         (error, data) => {
      if (error) {
        return next(error)
      } else { //if there is a matching service, returns it
        res.json(data)
      }
    })
  })
  
  // GET services based on search query
  // Ex: '...?name=Daycare&status=name'
  router.get('/search/', (req, res, next) => {
    const dbQuery = { org: org }
    switch (req.query.searchBy) {
      case 'name':
        // match services name, no anchor
        dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' }
        break
      case 'status':
        dbQuery.status = req.query.status
        break
      default:
        return res.status(400).send('invalid searchBy')
    }
    services.find(dbQuery, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  // POST new service
  router.post('/', (req, res, next) => {
    const newService = req.body
    newService.org = org
    services.create(newService, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  // PUT update service
  router.put('/update/:id', (req, res, next) => {
    services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  
  // hard DELETE service by ID, as per project specifications
  router.delete('/:id', (req, res, next) => {
    services.findByIdAndDelete(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else if (!data) {
        res.status(400).send('service not found')
      } else {
        res.send('Service deleted')
      }
    })
  })
  
  module.exports = router