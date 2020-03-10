/*
    Customer_test.ts
*/

import { test, succeed, fail } from '../test_deps.ts'
import * as Customer from './Customer.ts'
import * as Result from './Result.ts'

test(function Customer_parse() {
    // This strings should pass the test..
    const okStr = [
        'id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: 0, long: 0,',
        'id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: 0, long:00.0000,'
    ]

    // .. and this shouldn't.
    const errStr = [
        '',
        'id: x-x-x-x-x, lat:0, long:0.2oo1',
        'id: x, lat:0, long:0'
    ]

    okStr.map(Customer.parse).map(res =>
        Result.caseOf(res)
            .ok(_ => succeed())
            .error(fail)
    )

    errStr.map(Customer.parse).map(res =>
        Result.caseOf(res)
            .ok(_ => fail())
            .error(succeed)
    )
})

// runTests()
