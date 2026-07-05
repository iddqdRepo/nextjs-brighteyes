require("@testing-library/jest-dom");

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }) => {
    const React = require("react");
    return React.createElement("img", props);
  },
}));

jest.mock("@react-google-maps/api", () => {
  const React = require("react");

  return {
    __esModule: true,
    GoogleMap: ({ children }) => React.createElement("div", null, children),
    MarkerF: () => null,
    useJsApiLoader: () => ({ isLoaded: true }),
  };
});
