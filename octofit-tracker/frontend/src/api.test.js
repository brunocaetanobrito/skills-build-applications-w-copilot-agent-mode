import assert from 'node:assert/strict'
import test from 'node:test'
import { formatReference, getApiBaseUrl, normalizeListResponse } from './api.js'

test('uses the forwarded Codespaces API URL', () => {
  assert.equal(getApiBaseUrl(' example-space-123 '), 'https://example-space-123-8000.app.github.dev')
})

test('falls back safely for unset and blank Codespace names', () => {
  for (const name of [undefined, '', '   ']) {
    assert.equal(getApiBaseUrl(name), 'http://localhost:8000')
  }
})

test('rejects invalid Codespace names instead of constructing unsafe URLs', () => {
  for (const name of ['https://example.com', 'name/extra', 'name.example', 'name?query']) {
    assert.throws(() => getApiBaseUrl(name), /valid Codespace name/)
  }
})

test('accepts arrays and paginated results, including empty lists', () => {
  const records = [{ _id: '1', name: 'OctoFit' }]
  assert.equal(normalizeListResponse(records), records)
  assert.equal(normalizeListResponse({ count: 1, next: null, results: records }), records)
  assert.deepEqual(normalizeListResponse([]), [])
  assert.deepEqual(normalizeListResponse({ results: [] }), [])
})

test('rejects invalid response shapes explicitly', () => {
  for (const data of [null, {}, { results: {} }, [null], ['record'], [[]]]) {
    assert.throws(() => normalizeListResponse(data), /invalid list response/)
  }
})

test('formats raw and populated references without losing zero values', () => {
  assert.equal(formatReference('user-id'), 'user-id')
  assert.equal(formatReference({ name: 'Alex' }), 'Alex')
  assert.equal(formatReference({ email: 'alex@example.com' }), 'alex@example.com')
  assert.equal(formatReference({ _id: 'team-id' }), 'team-id')
  assert.equal(formatReference(undefined), 'Not available')
  assert.equal(formatReference(0), 0)
})
