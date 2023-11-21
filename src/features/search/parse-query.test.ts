import { parseQuery } from "./parse-query";

describe('parseQuery', () => {
	test('空文字列', () => {
		const result = parseQuery('');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: []
		});
	});
	test('空白文字列', () => {
		const result = parseQuery(' 　');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: []
		});
	});
	test('単語', () => {
		const result = parseQuery('foo');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				value: 'foo',
				negative: false
			}]
		});
	});
	test('単語（空白あり）', () => {
		const result = parseQuery(' foo ');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				value: 'foo',
				negative: false
			}]
		});
	});
	test('単語（複数）', () => {
		const result = parseQuery(' foo　 bar baz');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [
				{
					value: 'foo',
					negative: false
				},
				{
					value: 'bar',
					negative: false
				},
				{
					value: 'baz',
					negative: false
				}
			]
		});
	});
	test('単語（複数、マイナスあり）', () => {
		const result = parseQuery('foo -bar baz');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [
				{
					value: 'foo',
					negative: false
				},
				{
					value: 'bar',
					negative: true
				},
				{
					value: 'baz',
					negative: false
				}
			]
		});
	});
	test('key:value', () => {
		const result = parseQuery('foo:bar');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				fieldKey: 'foo',
				operator: ':',
				value: 'bar',
				negative: false
			}]
		});
	});
	test('key:value（複数、マイナスあり）', () => {
		const result = parseQuery(' foo:bar -baz:qux ');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [
				{
					fieldKey: 'foo',
					operator: ':',
					value: 'bar',
					negative: false
				},
				{
					fieldKey: 'baz',
					operator: ':',
					value: 'qux',
					negative: true
				}
			]
		});
	});
	test('key:>value', () => {
		const result = parseQuery('foo:>bar');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				fieldKey: 'foo',
				operator: ':>',
				value: 'bar',
				negative: false
			}]
		});
	});
	test('key:<value', () => {
		const result = parseQuery('foo:<bar');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				fieldKey: 'foo',
				operator: ':<',
				value: 'bar',
				negative: false
			}]
		});
	});
	test('key:>=value', () => {
		const result = parseQuery('foo:>=bar');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				fieldKey: 'foo',
				operator: ':>=',
				value: 'bar',
				negative: false
			}]
		});
	});
	test('key:<=value', () => {
		const result = parseQuery('foo:<=bar');
		expect(result).toEqual({
			kind: 'SUCCESS',
			value: [{
				fieldKey: 'foo',
				operator: ':<=',
				value: 'bar',
				negative: false
			}]
		});
	});
});