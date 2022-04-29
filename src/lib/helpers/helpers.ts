const isPropValuesEqual = (subject, target, propNames) =>
  propNames.every(propName => subject[propName] === target[propName]);

const getUniqueItemsByProperties = (items, propNames) =>
  items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(foundItem =>
        isPropValuesEqual(foundItem, item, propNames),
      ),
  );

// Must be in a separate file.
function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = 1910;
  var years: Array<string> = [];

  for (var i = max; i >= min; i--) {
    years.push(i.toString());
  }
  return years;
}

export {getUniqueItemsByProperties, generateArrayOfYears};
