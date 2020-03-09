/*
    Customer_test.ts
*/

import { test, assertEquals, assertNotEquals } from "../test_deps.ts";
import * as Customer from "./Customer.ts"
import * as Maybe from "./Maybe.ts"

test(function test_customer_parse() {

    const strings = [
        // This is how a string should look to parse it properly.
        "id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: 0, long:0",

        // They shouldn't pass the parser
        "",
        "id: x-x-x-x-x, lat:0, long:0.2oo1",
        "id: x-x-x-x-x, lat:0.Ioe1, long:0"
    ]

    const maybeCustomer = Customer.parse(strings[0])
    const customer = Maybe.orDefault(Customer.none, maybeCustomer)

    //
    assertNotEquals(Maybe.orDefault, Customer.none)
})

// runTests()