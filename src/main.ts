/*
    main.ts

    This program reads customer from a database file and outputs all Id's
    that are in a specific range of the Future of voice HQ on stdout. Errors
    will be reported on stderr.
*/
import * as Coord from './Data/Coordinate.ts'
import * as Customer from './Data/Customer.ts'
import * as Result from './Data/Result.ts'
import Pipe from './Data/Pipe.ts'

//  Config  //

const Config = {
    // Future of voice coordinates
    fovPos: Coord.create(52.493256, 13.446082),

    // Invite all customers in this distance in km
    customerInviteDistKM: 100, //km

    // Customer db file
    filename: '/data/customers.txt'
}

//  Helper  //

/*  Console log for use in a pipe. Logs a value/object and returns it. */
const log = (msg: string) => (obj: NonNullable<any>): NonNullable<any> => {
    console.log(msg, obj)
    return obj
}

const readFileAsString = async (filename: string): Promise<String> => {
    const blob = await Deno.readFile(filename)
    const filedata = new TextDecoder('utf-8').decode(blob)
    return filedata
}

const splitStringByNewlines = (s: string): Array<string> => s.split(/\r?\n/)

const parseLineByLineToCustomer = (txt: string): Result<Customer.Customer>[] =>
    splitStringByNewlines(txt).map(Customer.parse)

const isInDistanceToGetInvite = (c: Customer.Customer): boolean =>
    Coord.distance(Config.fovPos, c.pos) <= Config.customerInviteDistKM

const toId = (c: Customer.Customer): string => c.id

//  Main  //

const main = async () => {
    // Read the file, parse it line by line and create a list of results
    // containing the customer object or a reason of what went wrong.
    const customerResultList = Pipe(await readFileAsString(Config.filename))
        .andThen(parseLineByLineToCustomer)
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
        .filter(isInDistanceToGetInvite)
        .map(toId)
        .sort()

    // Log the errors to stderr. This makes it easy work with the
    // shell output without any warning interfer.
    invalidCustomers.map(err => console.error('Warning:', err))

    // Print out the customers id's we want to invite
    // seperated by newline.
    customerIdsToInvite.map(id => console.log(id))

    // Exit and tell the shell that everything is ok.
    // Deno.exit(0)
}

main()
