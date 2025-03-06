# errboost

Enhances error logging by capturing and logging errors with additional context and suggestions.

## Installation

```bash
npm install errboost
```

## Usage

```javascript
const enhancedErrorLogger = require('errboost/lib/errorLogger');

try {
  // Simulate a ReferenceError
  console.log(nonExistentVar);
} catch (error) {
  enhancedErrorLogger(error);
}
```

## Configuration

You can add custom error-to-fix mappings in `config/fixHints.js`.
