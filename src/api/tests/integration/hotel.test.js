const request = require('supertest');
const httpStatus = require('http-status');
const vars = require('../../../config/vars');
const app = require('../../../index');

describe('External Hotel Endpoint', () => {
  it('should have this properties', async (done) => {
    const res = await request(vars.hotels_api_url).get('');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('price');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('city');
    expect(res.body[0]).toHaveProperty('date_start');
    done();
  });
});

describe('GET /v1/hotels', () => {
  it('should return all hotels if no parameters provided WITH PAGINATION ON', () =>
    request(app)
      .get('/v1/hotels')
      .expect(httpStatus.FOUND)
      .then((res) => {
        const eleCount = res.body.hotels.length;
        expect(eleCount).toEqual(5);
      }));
});

describe('GET /v1/hotels?price', () => {
  it('should return all hotels that its prices between 100 and 300', () =>
    request(app)
      .get('/v1/hotels?price=[100, 300]')
      .expect(httpStatus.FOUND)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotel of res.body.hotels) {
          expect(hotel.price).toBeGreaterThanOrEqual(100);
          expect(hotel.price).toBeLessThanOrEqual(300);
        }
      }));
});

describe('GET /v1/hotels?name', () => {
  it('should return all hotels that its name contains _expedita_ text', () =>
    request(app)
      .get('/v1/hotels?name=expedita')
      .expect(httpStatus.FOUND)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotel of res.body.hotels) {
          expect(hotel.name).toContain('expedita');
        }
      }));
});

describe('GET /v1/hotels?city', () => {
  it('should return all hotels that its city contains _East_ text', () =>
    request(app)
      .get('/v1/hotels?name=East')
      .expect(httpStatus.FOUND)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotel of res.body.hotels) {
          expect(hotel.city).toContain('East');
        }
      }));
});

describe('GET /v1/hotels?date', () => {
  it('should return all hotels that its date between 2020-03-1,2020-03-30', () =>
    request(app)
      .get('/v1/hotels?name=2020-03-1,2020-03-30')
      .expect(httpStatus.FOUND)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotel of res.body.hotels) {
          hotel.date_start = new Date(hotel.date_start);
          const dateStart = new Date('2020-03-1');
          const dateEnd = new Date('2020-03-30');
          expect(hotel.date_start).toBeGreaterThanOrEqual(dateStart);
          expect(hotel.date_start).toBeLessThanOrEqual(dateEnd);
        }
      }));
});

describe('GET /v1/hotels?name=expedita&price=[575,580]', () => {
  it('should return all hotels that its price between 575,580 and name contain expedita', () =>
    request(app)
      .get('/v1/hotels?name=2020-03-1,2020-03-30')
      .expect(httpStatus.FOUND)
      .then((res) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const hotel of res.body.hotels) {
          if (hotel.price <= 580 && hotel.price >= 575) {
            expect(hotel.price).toBeGreaterThanOrEqual(575);
            expect(hotel.price).toBeLessThanOrEqual(580);
          }
          expect(hotel.name).toContain('expedita');
        }
      }));
});
