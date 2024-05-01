// This file is auto-generated. Do not edit this file manually.
//
// Disable formatting for this file to avoid linting errors.
// tslint:disable
// @ts-nocheck
/* eslint-disable */

import b from '../';

import { FireBamlEvent, traceAsync } from '@boundaryml/baml-core/ffi_layer';


describe('test_case:intermediate_olive', () => {
  const test_fn = traceAsync('intermediate_olive', 'null', [['impl', 'string']], 'positional', async (impl) => {
    FireBamlEvent.tags({
      'test_dataset_name': 'V2_FnClassOptional2',
      'test_case_name': 'test',
      'test_case_arg_name': `test_intermediate_olive[V2_FnClassOptional2-${impl}]`,
      'test_cycle_id': process.env.BOUNDARY_PROCESS_ID || 'local-run',
    });
    const test_case = { "input": { "prop1": "hi" } };
    const result = await b.V2_FnClassOptional2.getImpl(impl).run(
      test_case
    );
  });

  describe('function:V2_FnClassOptional2', () => {
    test('impl:default_config', async () => {
      await test_fn('default_config');
    }, 60000);
  });
});


