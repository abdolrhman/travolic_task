const axios = require('axios');
const httpStatus = require('http-status');
const SearchService = require('../services/search.service');
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
    let filteredData = new SearchService(apiResult.data, req.query);
    filteredData = filteredData.result();

    // paginate result
    const paginatedResult = getAllHotel(
      filteredData,
      req.query.page,
      req.query.items,
    );

    res.send({ hotels: paginatedResult });
  } catch (error) {
    next(error);
  }
};
