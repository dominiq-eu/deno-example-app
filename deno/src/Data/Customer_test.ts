/*
    Customer_test.ts
*/

import { test, assertEquals, assertNotEquals, fail } from "../test_deps.ts";
import * as Customer from "./Customer.ts"
import * as Result from "./Result.ts"

test(function Customer_parse() {

    // This is how a string should look to parse it properly.
    const okStr = "id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: 0, long: 0,"
    const okCust = Customer.parse(okStr)
    Result.match(okCust)
        .ok(customer => assertNotEquals(customer, Customer.none))
        .error(err => fail(err))

    // They shouldn't pass the parser
    const errStr = [
        "",
        "id: x-x-x-x-x, lat:0, long:0.2oo1",
        "id: x, lat:0, long:0"
    ]
    errStr.map(Customer.parse)
          .map(res =>
                Result.match(res)
                    .ok(err => fail("Customer: " + err))
                    .error(_ => assertEquals("",""))
                )
})

// runTests()