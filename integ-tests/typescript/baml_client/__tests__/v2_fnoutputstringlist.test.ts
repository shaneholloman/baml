// This file is auto-generated. Do not edit this file manually.
//
// Disable formatting for this file to avoid linting errors.
// tslint:disable
// @ts-nocheck
/* eslint-disable */

import b from '../';

import { FireBamlEvent, traceAsync } from '@boundaryml/baml-core/ffi_layer';


describe('test_case:substantial_tan', () => {
  const test_fn = traceAsync('substantial_tan', 'null', [['impl', 'string']], 'positional', async (impl) => {
    FireBamlEvent.tags({
      'test_dataset_name': 'V2_FnOutputStringList',
      'test_case_name': 'test',
      'test_case_arg_name': `test_substantial_tan[V2_FnOutputStringList-${impl}]`,
      'test_cycle_id': process.env.BOUNDARY_PROCESS_ID || 'local-run',
    });
    const test_case = { "input": "noop" };
    const result = await b.V2_FnOutputStringList.getImpl(impl).run(
      test_case
    );
  });

  describe('function:V2_FnOutputStringList', () => {
    test('impl:default_config', async () => {
      await test_fn('default_config');
    }, 60000);
  });
});


