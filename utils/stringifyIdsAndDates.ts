export function stringifyIdsAndDates(dataStructure: any) {
  //if dataStructure is an object
  if (
    typeof dataStructure === "object" &&
    dataStructure !== null &&
    !Array.isArray(dataStructure)
  ) {
    Object.keys(dataStructure).forEach((key) => {
      //loop through dataStructure and check if value is _id || array || object
      if (key === "_id") {
        dataStructure["_id"] = dataStructure["_id"].toString();
      }
      if (key === "createdAt") {
        dataStructure["createdAt"] = dataStructure["createdAt"].toString();
      }
      if (key === "updatedAt") {
        dataStructure["updatedAt"] = dataStructure["updatedAt"].toString();
      }
      if (key === "date") {
        dataStructure["date"] = dataStructure["date"].toString();
      }
      //if key is an array, loop through and stringify the contents
      if (Array.isArray(dataStructure[key])) {
        dataStructure[key].map((item: any) => {
          return stringifyIdsAndDates(item);
        });
      }
      //if key is an object, loop through and stringify the contents
      if (
        typeof dataStructure[key] === "object" &&
        dataStructure[key] !== null &&
        !Array.isArray(dataStructure[key])
      ) {
        stringifyIdsAndDates(dataStructure[key]);
      }
    });
  } else if (Array.isArray(dataStructure)) {
    dataStructure.forEach((item) => {
      stringifyIdsAndDates(item);
    });
  } else {
    return;
  }
}
