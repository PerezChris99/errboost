const enhancedErrorLogger = require('../lib/errorLogger');

try {
  // Simulate a ReferenceError
  console.log(nonExistentVar);
} catch (error) {
  enhancedErrorLogger(error);
}
