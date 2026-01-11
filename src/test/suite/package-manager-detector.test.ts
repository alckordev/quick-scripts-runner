import * as assert from 'assert';
import { PackageManagerDetector } from '../../core/package-manager-detector';
import { PackageManager } from '../../models/package-manager';
import { ConfigurationService } from '../../services/configuration-service';

suite('PackageManagerDetector Tests', () => {
  test('Should detect npm by default when no lock files exist', () => {
    const configService = new ConfigurationService();
    const detector = new PackageManagerDetector(configService);
    // Mock: no lock files
    const result = detector.detect('/fake/path');
    assert.strictEqual(result, PackageManager.NPM);
  });
});
