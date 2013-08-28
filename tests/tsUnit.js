var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Test = (function () {
    function Test() {
        this.tests = [];
        this.testClass = new TestClass();
    }
    Test.prototype.addTestClass = function (testClass, name) {
        if (typeof name === "undefined") { name = 'Tests'; }
        this.tests.push(new TestDefintion(testClass, name));
    };

    Test.prototype.isReservedFunctionName = function (functionName) {
        for (var prop in this.testClass) {
            if (prop === functionName) {
                return true;
            }
        }
        return false;
    };

    Test.prototype.run = function () {
        var testContext = new TestContext();
        var testResult = new TestResult();

        for (var i = 0; i < this.tests.length; ++i) {
            var testClass = this.tests[i].testClass;
            var testName = this.tests[i].name;
            for (var prop in testClass) {
                if (!this.isReservedFunctionName(prop)) {
                    if (typeof testClass[prop] === 'function') {
                        if (typeof testClass['setUp'] === 'function') {
                            testClass['setUp']();
                        }
                        try  {
                            testClass[prop](testContext);
                            testResult.passes.push(new TestDescription(testName, prop, 'OK'));
                        } catch (err) {
                            testResult.errors.push(new TestDescription(testName, prop, err));
                        }
                        if (typeof testClass['tearDown'] === 'function') {
                            testClass['tearDown']();
                        }
                    }
                }
            }
        }

        return testResult;
    };

    Test.prototype.showResults = function (result) {
        console.log(this.getTestResult(result));
        console.log(this.getTestSummary(result));
        console.log('\r\nErrors: ' + this.getTestResultList(result.errors));
        console.log('\r\nPassing Tests: ' + this.getTestResultList(result.passes));
    };

    Test.prototype.getTestResult = function (result) {
        return result.errors.length === 0 ? 'TEST PASSED' : 'TEST FAILED';
    };

    Test.prototype.getTestSummary = function (result) {
        return '\r\nTotal tests: ' + (result.passes.length + result.errors.length).toString() + '\r\n\tPassed tests: ' + result.passes.length + '\r\n\tFailed tests: ' + result.errors.length;
    };

    Test.prototype.getTestResultList = function (testResults) {
        var list = '';
        var group = '';
        var isFirst = true;
        for (var i = 0; i < testResults.length; ++i) {
            var result = testResults[i];
            if (result.testName !== group) {
                group = result.testName;
                if (isFirst) {
                    isFirst = false;
                } else {
                    list += '\r\n';
                }
                list += '\r\n' + result.testName;
            }
            list += '\r\n\t' + result.funcName + '(): ' + result.message;
        }
        return list + '';
    };
    return Test;
})();
exports.Test = Test;

var TestContext = (function () {
    function TestContext() {
    }
    TestContext.prototype.setUp = function () {
    };

    TestContext.prototype.tearDown = function () {
    };

    TestContext.prototype.areIdentical = function (a, b) {
        if (a !== b) {
            throw 'areIdentical failed when passed ' + '{' + (typeof a) + '} "' + a + '" and ' + '{' + (typeof b) + '} "' + b + '"';
        }
    };

    TestContext.prototype.areNotIdentical = function (a, b) {
        if (a === b) {
            throw 'areNotIdentical failed when passed ' + '{' + (typeof a) + '} "' + a + '" and ' + '{' + (typeof b) + '} "' + b + '"';
        }
    };

    TestContext.prototype.isTrue = function (a) {
        if (!a) {
            throw 'isTrue failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
        }
    };

    TestContext.prototype.isFalse = function (a) {
        if (a) {
            throw 'isFalse failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
        }
    };

    TestContext.prototype.isTruthy = function (a) {
        if (!a) {
            throw 'isTrue failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
        }
    };

    TestContext.prototype.isFalsey = function (a) {
        if (a) {
            throw 'isFalse failed when passed ' + '{' + (typeof a) + '} "' + a + '"';
        }
    };

    TestContext.prototype.throws = function (a) {
        var isThrown = false;
        try  {
            a();
        } catch (ex) {
            isThrown = true;
        }
        if (!isThrown) {
            throw 'did not throw an error';
        }
    };

    TestContext.prototype.fail = function () {
        throw 'fail';
    };
    return TestContext;
})();
exports.TestContext = TestContext;

var TestClass = (function (_super) {
    __extends(TestClass, _super);
    function TestClass() {
        _super.apply(this, arguments);
    }
    return TestClass;
})(TestContext);
exports.TestClass = TestClass;

var FakeFunction = (function () {
    function FakeFunction(name, delgate) {
        this.name = name;
        this.delgate = delgate;
    }
    return FakeFunction;
})();
exports.FakeFunction = FakeFunction;

var Fake = (function () {
    function Fake(obj) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'function') {
                this[prop] = function () {
                };
            } else {
                this[prop] = null;
            }
        }
    }
    Fake.prototype.create = function () {
        return this;
    };

    Fake.prototype.addFunction = function (name, delegate) {
        this[name] = delegate;
    };

    Fake.prototype.addProperty = function (name, value) {
        this[name] = value;
    };
    return Fake;
})();
exports.Fake = Fake;

var TestDefintion = (function () {
    function TestDefintion(testClass, name) {
        this.testClass = testClass;
        this.name = name;
    }
    return TestDefintion;
})();

var TestError = (function () {
    function TestError(name, message) {
        this.name = name;
        this.message = message;
    }
    return TestError;
})();

var TestDescription = (function () {
    function TestDescription(testName, funcName, message) {
        this.testName = testName;
        this.funcName = funcName;
        this.message = message;
    }
    return TestDescription;
})();
exports.TestDescription = TestDescription;

var TestResult = (function () {
    function TestResult() {
        this.passes = [];
        this.errors = [];
    }
    return TestResult;
})();
exports.TestResult = TestResult;

