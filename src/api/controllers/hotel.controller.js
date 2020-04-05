const axios = require('axios');
const httpStatus = require('http-status');
const SearchService = require('../services/search.service');
const OrganizerService = require('../services/organizer.service');
const vars = require('../../config/vars');

/**
 * Connect all layers together
 * hint: filter -> sort -> paginate
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.search = async (req, res, next) => {
  try {
    res.status(httpStatus.FOUND);
    const apiResult = await axios.get(vars.hotels_api_url);

    // filter result
    const searchService = new SearchService(apiResult.data, req.query);
    let result = searchService.result();

    // can't sort or paginate empty array
    if (result && result.length) {
      // sort result
      const OrgService = new OrganizerService(result);
      if (req.query.sort) {
        result = OrgService.sortBy(req.query.sort);
      }
      // paginate result
      result = OrgService.paginateData(
        req.query.page,
        req.query.items,
      );
    }

    res.send({ hotels: result });
  } catch (error) {
    next(error);
  }
};
