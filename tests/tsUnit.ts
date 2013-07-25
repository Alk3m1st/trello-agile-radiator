export interface ITestClass {

}

export class Test {
    private tests: TestDefintion[] = [];
    private testClass: TestClass = new TestClass();

    addTestClass(testClass: ITestClass, name: string = 'Tests'): void {
        this.tests.push(new TestDefintion(testClass, name));
    }

    isReservedFunctionName(functionName: string): boolean {
        for (var prop in this.testClass) {
            if (prop === functionName) {
                return true;
            }
        }
        return false;
    }

    run() {
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
                        try {
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
    }

    showResults(result: TestResult) {
        console.log(this.getTestResult(result));
        console.log(this.getTestSummary(result));
        console.log('\r\nErrors: ' + this.getTestResultList(result.errors));
        console.log('\r\nPassing Tests: ' + this.getTestResultList(result.passes));
    }

    private getTestResult(result: TestResult) {
        return result.errors.length === 0 ? 'TEST PASSED' : 'TEST FAILED';
    }

    private getTestSummary(result: TestResult) {
        return '\r\nTotal tests: ' + (result.passes.length + result.errors.length).toString() +
            '\r\n\tPassed tests: ' + result.passes.length +
            '\r\n\tFailed tests: ' + result.errors.length;
    }

    private getTestResultList(testResults: TestDescription[]) {
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
    }
}

export class TestContext {
    setUp() {
    }

    tearDown() {
    }

    areIdentical(a: any, b: any): void {
        if (a !== b) {
            throw 'areIdentical failed when passed ' +
                '{' + (typeof a) + '} "' + a + '" and ' +
                '{' + (typeof b) + '} "' + b + '"';
        }
    }

    areNotIdentical(a: any, b: any): void {
        if (a === b) {
            throw 'areNotIdentical failed when passed ' +
                '{' + (typeof a) + '} "' + a + '" and ' +
                '{' + (typeof b) + '} "' + b + '"';
        }
    }

    isTrue(a: boolean) {
        if (!a) {
            throw 'isTrue failed when passed ' +
                '{' + (typeof a) + '} "' + a + '"';
        }
    }

    isFalse(a: boolean) {
        if (a) {
            throw 'isFalse failed when passed ' +
                '{' + (typeof a) + '} "' + a + '"';
        }
    }

    isTruthy(a: any) {
        if (!a) {
            throw 'isTrue failed when passed ' +
                '{' + (typeof a) + '} "' + a + '"';
        }
    }

    isFalsey(a: any) {
        if (a) {
            throw 'isFalse failed when passed ' +
                '{' + (typeof a) + '} "' + a + '"';
        }
    }

    throws(a: { (): void; }) {
        var isThrown = false;
        try {
            a();
        } catch (ex) {
            isThrown = true;
        }
        if (!isThrown) {
            throw 'did not throw an error';
        }
    }

    fail() {
        throw 'fail';
    }
}

export class TestClass extends TestContext {

}

export class FakeFunction {
    constructor(public name: string, public delgate: { (...args: any[]): any; }) {
    }
}

export class Fake {
    constructor(obj: any) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'function') {
                this[prop] = function () { };
            } else {
                this[prop] = null;
            }
        }
    }

    create(): any {
        return this;
    }

    addFunction(name: string, delegate: { (...args: any[]): any; }) {
        this[name] = delegate;
    }

    addProperty(name: string, value: any) {
        this[name] = value;
    }
}

class TestDefintion {
    constructor(public testClass: ITestClass, public name: string) {
    }
}

class TestError implements Error {
    constructor(public name: string, public message: string) {
    }
}

export class TestDescription {
    constructor(public testName: string, public funcName: string, public message: string) {
    }
}

export class TestResult {
    public passes: TestDescription[] = [];
    public errors: TestDescription[] = [];
}