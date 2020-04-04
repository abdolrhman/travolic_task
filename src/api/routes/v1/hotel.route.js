const express = require('express');
const controller = require('../../controllers/hotel.controller');

const router = express.Router();

router
  .route('/hotels')
  /**
   * @api {get} v1/hotels List Hotels
   * @apiDescription Get a list of hotels
   * @apiVersion 1.0.0
   * @apiName ListHotels
   * @apiGroup Hotel
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Hotels per page
   * @apiParam  {String}             [name]       Hotel's name
   *
   * @apiSuccess {Object[]} hotels List of hotels.
   *
   */
  .get(controller.search);

module.exports = router;
