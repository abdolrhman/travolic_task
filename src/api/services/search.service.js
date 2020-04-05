const _ = require('lodash');

class SearchCriteria {
  constructor(list, criteria) {
    this.list = list;
    this.criteria = criteria;
  }

  citySearch(city) {
    return this.list.filter(hotel => hotel.city.includes(city));
  }

  nameSearch(name) {
    return this.list.filter(hotel => hotel.name.includes(name));
  }

  /**
   * Range Price
   * @param start price
   * @param end price
   */
  priceRangeSearch(start, end) {
    return this.list.filter(hotel => _.inRange(hotel.price, start, end));
  }

  /**
   * Range Date
   * @param start date
   * @param end date
   * @returns {*}
   */
  dateRangeSearch(start, end) {
    return this.list.filter((hotel) => {
      let date = hotel.date_start.split('T');
      date = new Date(date[0]);
      const dateStart = new Date(start);
      const dateEnd = new Date(end);
      return date >= dateStart && date <= dateEnd;
    });
  }

  /**
   * Gets all criteria results into one array
   * @returns {[]}
   */
  result() {
    let result = [];
    let nameSearchResult = [];
    let citySearchResult = [];
    let priceSearchResult = [];
    let dateSearchResult = [];
    Object.keys(this.criteria).forEach((key) => {
      if (key === 'name') {
        nameSearchResult = this.nameSearch(this.criteria.name);
      }
      if (key === 'city') {
        citySearchResult = this.citySearch(this.criteria.city);
      }
      if (key === 'price') {
        const priceRange = this.criteria.price.split(',');
        priceSearchResult = this.priceRangeSearch(
          parseInt(priceRange[0], 10),
          parseInt(priceRange[1], 10),
        );
      }
      if (key === 'date') {
        const dateRange = this.criteria.date.split(',');
        dateSearchResult = this.dateRangeSearch(dateRange[0], dateRange[1]);
      }

      result = _.union(
        nameSearchResult,
        citySearchResult,
        priceSearchResult,
        dateSearchResult,
      );
    });
    return result;
  }
}

module.exports = SearchCriteria;
