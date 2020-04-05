const _ = require('lodash');

class OrganizerService {
  constructor(list) {
    this.list = list;
  }

  /**
   * Private method for pagination
   * @param page
   * @param items
   * @returns {*}
   */
  getAllHotel(page = 1, items = 5) {
    const indexStart = (page - 1) * items;
    const indexEnd = indexStart + items;
    return this.list.slice(indexStart, indexEnd);
  }

  sortBy(sortCriteria) {
    const sortKeys = Object.keys(sortCriteria);
    const sortValues = Object.values(sortCriteria);
    _.orderBy(this.list, sortKeys, sortValues)
  }
}

module.exports = OrganizerService;
