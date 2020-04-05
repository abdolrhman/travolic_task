const axios = require('axios');
const httpStatus = require('http-status');
const SearchService = require('../services/search.service');
const OrganizerService = require('../services/organizer.service');
const vars = require('../../config/vars');

/**
 * Private method for pagination
 * @param hotels
 * @param page
 * @param items
 * @returns {*}
 */
function getAllHotel(hotels, page = 1, items = 5) {
  const indexStart = (page - 1) * items;
  const indexEnd = indexStart + items;
  return hotels.slice(indexStart, indexEnd);
}


/**
 * List Hotels
 * @public
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
      if (req.query.sort) {
        const sortOrg = new OrganizerService(result);
        result = sortOrg.sortBy(req.query.sort);
      }
      // paginate result
      result = getAllHotel(
        result,
        req.query.page,
        req.query.items,
      );
    }

    res.send({ hotels: result });
  } catch (error) {
    next(error);
  }
};
