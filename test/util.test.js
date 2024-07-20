const { mergeObjectsWithArrayValues } = require('../util.js');

describe('mergeObjectsWithArrayValues', () => {
  test('merges objects with non-array values', () => {
    const obj1 = { key1: 'value1' };
    const obj2 = { key2: 'value2' };
    const expected = { key1: 'value1', key2: 'value2' };
    expect(mergeObjectsWithArrayValues(obj1, obj2)).toEqual(expected);
  });

  test('merges objects with same keys and array values', () => {
    const obj1 = { key: ['value1'] };
    const obj2 = { key: ['value2'] };
    const expected = { key: ['value1', 'value2'] };
    expect(mergeObjectsWithArrayValues(obj1, obj2)).toEqual(expected);
  });

  test('handles objects where one has an array and the other has a non-array for the same key', () => {
    const obj1 = { key: ['value1'] };
    const obj2 = { key: 'value2' };
    const expected = { key: 'value2' }; // Assuming obj2's value overwrites obj1's
    expect(mergeObjectsWithArrayValues(obj1, obj2)).toEqual(expected);
  });

  test('merges objects with no overlapping keys', () => {
    const obj1 = { key1: ['value1'] };
    const obj2 = { key2: ['value2'] };
    const expected = { key1: ['value1'], key2: ['value2'] };
    expect(mergeObjectsWithArrayValues(obj1, obj2)).toEqual(expected);
  });
});