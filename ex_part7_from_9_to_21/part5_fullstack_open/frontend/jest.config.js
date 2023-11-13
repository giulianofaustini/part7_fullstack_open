
module.exports = {

    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },

    moduleNameMapper: {
        '\\.css$': '<rootDir>/empty-module.js',
      },

    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'css'],

    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/mocks/fileMock.js"
}
}



