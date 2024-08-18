const { Container: DI } = require('./index');

const { test, describe } = require('node:test');
const assert = require('node:assert');

describe('Container', () => {
    test('should create a new instance', () => {
        const di = DI.create({});
        const di2 = DI.create({});

        assert.strictEqual(di instanceof DI, true, 'di should be an instance of DIContainer');
        assert.strictEqual(di2 instanceof DI, true, 'di2 should be an instance of DIContainer');
        assert.notStrictEqual(di, di2, 'di and di2 should be different instances');
    });

    test('should check if a key exists', () => {
        const di = DI.create({ name: 'Anderson' });

        assert.strictEqual(di.has('name'), true, 'di should have name key');
        assert.strictEqual(di.has('lastname'), false, 'di should not have lastname key');
    });

    test('should get a value by key', () => {
        const di = DI.create({ name: 'Anderson' });

        assert.strictEqual(di.get('name'), 'Anderson', 'di should return the value "Anderson" for the key "name"');
    });

    test('should throw an error if key does not exist', () => {
        const di = DI.create({});

        assert.throws(() => di.get('key'), Error, 'di should throw an error when trying to get a non-existent key');
    });

    test('should resolve a function definition', () => {
        const di = DI.create({
            key: () => 'value'
        });

        assert.strictEqual(di.get('key'), 'value', 'di should return the value "value" for the key "key"');
    });

    test('should cache resolved entries', async () => {
        const di = DI.create({
            key: () => Math.floor((Math.random() * 100000) + 1)
        });

        const value1 = di.get('key');
        const value2 = di.get('key');

        assert.strictEqual(value1, value2, 'di should return the same value for subsequent calls to get with the same key');
    });

    test('should return a function definition', () => {
        const di = DI.create({
            'randomNumber': () => () => Math.floor((Math.random() * 100000) + 1)
        });

        const randomNumber = di.get('randomNumber');
        const randomNumber2 = di.get('randomNumber');

        assert.strictEqual(randomNumber, randomNumber2, 'di should return the same function for subsequent calls to get with the same key');
        assert.notStrictEqual(randomNumber(), randomNumber2(), 'di should return different values for subsequent calls to the function returned by get');
    });
});
