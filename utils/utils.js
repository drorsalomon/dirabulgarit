const sanitizer = require('sanitizer');

exports.replaceString = (input) => {
  // Define the exact match strings
  const upperCaseMatch = 'BULGARIAN RESALES';
  const lowerCaseMatch = 'bulgarian resales';
  const capFirstLetterCaseMatch = 'Bulgarian resales';
  const capFirstTwoLetterCaseMatch = 'Bulgarian Resales';
  const replacement = 'דירה בולגרית';

  // Check if the input contains the exact uppercase or lowercase match
  if (input.includes(upperCaseMatch)) {
    // Replace the exact uppercase match
    return input.replace(upperCaseMatch, replacement);
  } else if (input.includes(lowerCaseMatch)) {
    // Replace the exact lowercase match
    return input.replace(lowerCaseMatch, replacement);
  } else if (input.includes(capFirstLetterCaseMatch)) {
    // Replace the exact lowercase match
    return input.replace(capFirstLetterCaseMatch, replacement);
  } else if (input.includes(capFirstTwoLetterCaseMatch)) {
    // Replace the exact lowercase match
    return input.replace(capFirstTwoLetterCaseMatch, replacement);
  } else {
    // If no match, return the input as is
    return input;
  }
};

// Used to remove ID from bulgarian resales Json title field
exports.removeIdFromAssetTitle = (input) => {
  // Find the position of the last comma
  let lastCommaIndex = input.lastIndexOf(',');

  // Remove everything after the last comma
  let resultString = lastCommaIndex !== -1 ? input.substring(0, lastCommaIndex) : input;

  // Return the count of commas and the processed string
  return resultString;
};

// Used for bulgarian resales project Json field
exports.cleanString = (input) => {
  // Remove all instances of "/"
  let cleanedInput = input.replace(/\//g, '');

  // Split the string into words
  let words = cleanedInput.split(/\s+/);

  // Create a set to keep track of seen words
  let seenWords = new Set();

  // Array to store the result words
  let resultWords = [];

  // Iterate over the words and add the first appearance to resultWords
  words.forEach((word) => {
    if (!seenWords.has(word)) {
      seenWords.add(word);
      resultWords.push(word);
    }
  });

  // Join the result words back into a single string
  return resultWords.join(' ');
};

exports.buildMongooseQuery = (filter) => {
  let mongooseQuery = {};

  // If city filter has values, include it in the query
  if (Array.isArray(filter.city) && filter.city.length > 0) {
    mongooseQuery.city = { $in: filter.city.map((city) => sanitizer.sanitize(city)) };
  }

  // If rooms filter has values, include it in the query
  if (Array.isArray(filter.rooms) && filter.rooms.length > 0) {
    mongooseQuery.rooms = { $in: filter.rooms.map((room) => sanitizer.sanitize(room)) };
  }

  // If type filter has values, include it in the query
  if (Array.isArray(filter.type) && filter.type.length > 0) {
    mongooseQuery.type = { $in: filter.type.map((type) => sanitizer.sanitize(type)) };
  }

  // If project filter has values, include it in the query
  if (Array.isArray(filter.project) && filter.project.length > 0) {
    mongooseQuery.project = { $in: filter.project.map((project) => sanitizer.sanitize(project)) };
  }

  // If oceanView filter has values, include it in the query
  if (Array.isArray(filter.oceanView) && filter.oceanView.length > 0) {
    console.log(filter.oceanView);
    mongooseQuery.oceanView = { $in: filter.oceanView.map((oceanView) => sanitizer.sanitize(oceanView)) };
  }

  // If priceMin and priceMax filters have values, include them in the query
  if (filter.currency === 'euro') {
    if (!filter.priceMin && !filter.priceMax) {
      mongooseQuery.price = { $gte: 0, $lte: 1000000 };
    } else if (filter.priceMin && !filter.priceMax) {
      mongooseQuery.price = { $gte: sanitizer.sanitize(filter.priceMin), $lte: 1000000 };
    } else if (!filter.priceMin && filter.priceMax) {
      mongooseQuery.price = { $gte: 0, $lte: sanitizer.sanitize(filter.priceMax) };
    } else if (filter.priceMin && filter.priceMax) {
      mongooseQuery.price = { $gte: sanitizer.sanitize(filter.priceMin), $lte: sanitizer.sanitize(filter.priceMax) };
    }
  } else {
    if (!filter.priceMin && !filter.priceMax) {
      mongooseQuery.priceNis = { $gte: 0, $lte: 1000000 };
    } else if (filter.priceMin && !filter.priceMax) {
      mongooseQuery.priceNis = { $gte: sanitizer.sanitize(filter.priceMin), $lte: 1000000 };
    } else if (!filter.priceMin && filter.priceMax) {
      mongooseQuery.priceNis = { $gte: 0, $lte: sanitizer.sanitize(filter.priceMax) };
    } else if (filter.priceMin && filter.priceMax) {
      mongooseQuery.priceNis = { $gte: sanitizer.sanitize(filter.priceMin), $lte: sanitizer.sanitize(filter.priceMax) };
    }
  }

  if (filter.id) {
    mongooseQuery = {};
    mongooseQuery.id = sanitizer.sanitize(filter.id);
    return mongooseQuery;
  }

  if (filter.name) {
    const sanitizedName = sanitizer.sanitize(filter.name);
    const regex = new RegExp(sanitizedName, 'i'); // 'i' for case-insensitive search
    mongooseQuery.name = { $regex: regex };
  }

  return mongooseQuery;
};

exports.populatePagesArray = (assetsArray, resPerPage) => {
  const totalPages = [];

  const pages = Math.ceil(assetsArray.length / resPerPage);

  // Populate the pages array for pagination
  for (let i = 1; i <= pages; i++) {
    totalPages.push(i);
  }
  return totalPages;
};

exports.limitString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
};
