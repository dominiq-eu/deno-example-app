/*
    Customer.ts

    Data type representing a customer.
*/
import * as Coordinate from './Coordinate.ts'
import * as Result from './Result.ts'
import Pipe from './Pipe.ts'

export interface Customer {
    readonly _type: 'CustomerType'
    readonly id: string
    readonly pos: Coordinate.Coordinate
}

//
// Create a Customer.
//
// @param id The uniq Customer Id
// @param pos The coordinate of the customer
//
export const create = (id: string, pos: Coordinate.Coordinate): Customer => ({
    _type: 'CustomerType',
    id,
    pos
})

//
//  Parse a string to a customer in the format:
//  "id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, lat: x, long: x"
//
const regex = /^id:\s*?([\w-]*?),\s*?lat:\s*?([\d.]*?),\s*?long:\s*?([\d.]*?),/
const isIdValid = (id: NonNullable<any>): id is string =>
    typeof id === 'string' && id.split('-').length == 5
const isLatValid = (lat: NonNullable<any>): lat is number =>
    typeof lat === 'number'
const isLngValid = (lng: NonNullable<any>): lng is number =>
    typeof lng === 'number'

export const parse = (line: string): Result.Result<Customer> =>
    Pipe(line.match(regex))
        .andThen(found => found || [])
        .andThen(found => ({
            id: found[1],
            lat: Number.parseFloat(found[2]),
            lng: Number.parseFloat(found[3])
        }))
        .andThen(({ id, lat, lng }) =>
            isIdValid(id) && isLatValid(lat) && isLngValid(lng)
                ? Result.Ok(create(id, Coordinate.create(lat, lng)))
                : Result.Err('Parse error: "' + line + '"')
        )
        .value()
