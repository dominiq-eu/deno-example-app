/*
    main.ts

*/
import * as Coord from './Data/Coordinate.ts'
import * as Customer from './Data/Customer.ts'
import * as Result from './Data/Result.ts'
import Pipe from './Data/Pipe.ts'

// Future of voice coordinates
const FovPos = Coord.create(52.493256, 13.446082)

// Invite all customers in this distance in km
const CustomerInviteDistKM = 100 //km

// Customer db file
const filename = '/data/customers.txt'

// Console log for use in a pipe.
const log = (msg: string) => (obj: NonNullable<any>) => {
    console.log(msg, obj)
    return obj
}

const readFileContents = async (filename: string): Promise<String> => {
    const blob = await Deno.readFile(filename)
    const filedata = new TextDecoder('utf-8').decode(blob)
    return filedata
}

const splitStringByNewlines = (s: string): Array<string> => s.split(/\r?\n/)

const isInDistanceToInvite = (c: Customer.Customer): boolean =>
    Coord.distance(FovPos, c.pos) <= CustomerInviteDistKM

const toId = (c: Customer.Customer): string => c.id

const main = async () => {
    // Read the file, parse it line by line and create a list of results
    // containing the customer object or a reason of what went wrong.
    const customerResultList = Pipe(await readFileContents(filename))
        .andThen(splitStringByNewlines)
        .andThen(lines => lines.map(Customer.parse))
        .value()

    // Get all parse failures and create a list of error strings, why the
    // parsing went wrong.
    const invalidCustomers: Array<string> = customerResultList
        .filter(Result.isErr)
        .map(Result.errReason)

    // Transform the customer list to a sorted list of all customer id's we
    // want to invite.
    const customerIdsToInvite: Array<string> = customerResultList
        .filter(Result.isOk)
        .map(Result.okValue)
        .filter(isInDistanceToInvite)
        .map(toId)
        .sort()

    // Log the errors
    invalidCustomers.map(err => console.error('Warning:', err))

    // Log customer id's to invite
    customerIdsToInvite.map(id => console.log(id))
}

// {
//     const contents = await readFileContents('/data/customers.txt')
//     const customerResultList = contents.split(/\r?\n/).map(Customer.parse)

//     // Split into two lists, error and valid.
//     const customerParseErrors = customerResultList.filter(Result.isErr)
//     const customers = customerResultList.filter(Result.isOk).map(Result.okValue)
//     const customerInviteIds = customers
//         .filter(c => Coord.distance(FovPos, c.pos) <= CustomerInviteDistKM)
//         .map(c => c.id)
//         .sort()

//     // log errors
//     customerParseErrors.map(Result.errReason).map(log('Error'))

//     // Log all customers to invite
//     customerInviteIds.map(log('Customer:'))
// }

main()
