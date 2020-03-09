/*
    Customer.ts

    Data type representing a customer.
*/
import * as Coordinate from "./Coordinate.ts";
import * as Maybe from "./Maybe.ts";
import Pipe from "./Pipe.ts";

interface Type {
  readonly _type: "CustomerType";
  readonly id: string;
  readonly pos: Coordinate.Coordinate;
}

interface None {
    readonly _type: "NoCustomerType";
}

export type Customer = Type | None;

//
// Create a Customer.
//
// @param id The uniq Customer Id
// @param pos The coordinate of the customer
//
export const create = (id: string, pos: Coordinate.Coordinate): Customer => ({
  _type: "CustomerType",
  id,
  pos
});

export const none: Customer = ({ _type: "NoCustomerType" })

//
//  Parse a string to a customer in the format:
//  "id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: x, long: x"
//
const regex =
  /^id:\s*?([\w-]*?),\s*?lat:\s*?([\d.]*?),\s*?long:\s*?([\d.]*?),/;
const isIdValid = (id: any): id is string =>
  typeof id === "string" && id.split("-").length == 5;
const isLatValid = (lat: any): lat is number => typeof lat === "number";
const isLngValid = (lng: any): lng is number => typeof lng === "number";

export const parse = (line: string): Maybe.Maybe<Customer> =>
  Pipe(line.match(regex))
    .andThen(found => found || [])
    .andThen(found => ({
      id: found[1],
      lat: Number.parseFloat(found[2]),
      lng: Number.parseFloat(found[3])
    })
    )
    .andThen(({ id, lat, lng }) =>
      (isIdValid(id) && isLatValid(lat) && isLngValid(lng))
        ? Maybe.Just(create(id, Coordinate.create(lat, lng)))
        : Maybe.Nothing
    )
    .value();
