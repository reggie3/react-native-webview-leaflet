"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VectorLayers_1 = require("../VectorLayers");
var React = require("react");
var react_native_testing_library_1 = require("react-native-testing-library");
var appVectorLayers_1 = require("../mocks/appVectorLayers");
describe('VectorLayers component', function () {
    it('should render', function () {
        var renderRes = react_native_testing_library_1.render(React.createElement(VectorLayers_1.default, { vectorLayers: appVectorLayers_1.default }));
        console.log('================================');
        console.log(renderRes);
        console.log('================================');
    });
});
//# sourceMappingURL=VectorLayers.test.js.map