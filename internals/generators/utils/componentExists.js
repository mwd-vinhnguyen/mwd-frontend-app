/**
 * componentExists
 *
 * Check whether the given component exist in either the components or features directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(
  path.join(__dirname, '../../../app/components'),
);
const pagefeatures = fs.readdirSync(
  path.join(__dirname, '../../../app/features'),
);
const components = pageComponents.concat(pagefeatures);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
