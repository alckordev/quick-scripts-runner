import * as assert from 'assert';
import { ScriptExecutor } from '../../core/script-executor';

suite('ScriptExecutor Tests', () => {
  test('Should create instance correctly', () => {
    const executor = new ScriptExecutor();
    assert.ok(executor);
  });

  test('Should have execute method', () => {
    const executor = new ScriptExecutor();
    // Cannot test real execution without vscode mock
    assert.ok(typeof executor.execute === 'function');
  });
});
