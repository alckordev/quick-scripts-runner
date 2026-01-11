import * as assert from 'assert';
import { PackageJsonReader } from '../../services/package-json-reader';

suite('PackageJsonReader Tests', () => {
  test('Should create instance correctly', () => {
    const reader = new PackageJsonReader();
    assert.ok(reader);
  });

  test('Should return false for non-existent path', () => {
    const reader = new PackageJsonReader();
    const exists = reader.exists('/fake/path/that/does/not/exist');
    assert.strictEqual(exists, false);
  });
});
