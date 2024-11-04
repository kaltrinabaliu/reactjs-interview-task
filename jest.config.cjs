module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  };
  