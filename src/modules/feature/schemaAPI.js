// A mock function to mimic making an async request for data
const testData = require("../../schema.json");
export function fetchSchema() {
  return new Promise((resolve) => setTimeout(() => resolve({ data: testData })));
}
