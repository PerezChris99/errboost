const fixHints = require('../config/fixHints');

function parseStackTrace(stack) {
  // Extract the first line that looks like: "at FunctionName (path/to/file.js:line:column)"
  const stackLines = stack.split('\n');
  for (let line of stackLines) {
    const match = line.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
    if (match) {
      const [, functionName, filePath, lineNumber, columnNumber] = match;
      return { functionName, filePath, lineNumber, columnNumber };
    }
  }
  return {};
}

function suggestFix(errorMessage) {
  // Loop over fixHints keys to see if any pattern matches the error message.
  for (let pattern in fixHints) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(errorMessage)) {
      return fixHints[pattern];
    }
  }
  return 'No suggestion available. Please review the error and your code.';
}

function enhancedErrorLogger(err) {
  // Log timestamp and error message
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${err.message}`);

  // Parse stack trace for location details
  if (err.stack) {
    const location = parseStackTrace(err.stack);
    if (location.filePath) {
      console.error(`Error occurred in: ${location.filePath} at line ${location.lineNumber}, column ${location.columnNumber}`);
    } else {
      console.error('Could not parse error location from stack trace.');
    }
  }

  // Provide a suggestion based on error message
  const suggestion = suggestFix(err.message);
  console.error(`Suggestion: ${suggestion}`);
}

module.exports = enhancedErrorLogger;
