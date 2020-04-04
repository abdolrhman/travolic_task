const axios = require('axios');
const httpStatus = require('http-status');
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
    res.status(httpStatus.CREATED);
    const apiResult = await axios.get(vars.hotels_api_url);
    const paginatedResult = getAllHotel(
      apiResult.data,
      req.query.page,
      req.query.items,
    );
    res.send({ hotels: paginatedResult });
  } catch (error) {
    next(error);
  }
};
