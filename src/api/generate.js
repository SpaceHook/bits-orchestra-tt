module.exports = function() {
  const faker = require("@faker-js/faker");
  const _ = require("lodash");
  return { 
    books: _.times(30, function (n) {
      return {
        id: n + 1,
        title: faker.faker.random.words(),
        author: faker.faker.name.fullName(),
        category: faker.faker.word.adjective(),
        isbn: parseInt(faker.faker.random.numeric(10))
      }
    })
  }
}