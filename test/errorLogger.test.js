const enhancedErrorLogger = require('../lib/errorLogger');

function testEnhancedErrorLogger() {
  try {
    // Simulate a ReferenceError
    console.log(nonExistentVar);
  } catch (error) {
    enhancedErrorLogger(error);
  }

  try {
    // Simulate a TypeError
    const nonFunction = {};
    nonFunction();
  } catch (error) {
    enhancedErrorLogger(error);
  }
}

testEnhancedErrorLogger();
