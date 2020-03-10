/*
    main.ts

*/
import * as Coord from "./Data/Coordinate.ts"
import * as Customer from "./Data/Customer.ts"
import * as Result from "./Data/Result.ts"

// Future of voice coordinates
const FovPos = Coord.create(52.493256, 13.446082)

// Invite all customers in this distance in km
const CustomerInviteDistKM = 100 //km


// Console log for use in a pipe.
const log = (msg: string) => (obj: any) => {
    console.log(msg, obj)
    return obj
}


const readFileContents = async (filename: string): Promise<String> => {
    const blob = await Deno.readFile(filename)
    const filedata = new TextDecoder('utf-8').decode(blob)
    return filedata
}

const main = async () => {
    const contents = await readFileContents('/data/customers.txt')
    const customerResultList = contents.split(/\r?\n/).map(Customer.parse)

    // Split into two lists, error and valid.
    const customerParseErrors = customerResultList.filter(Result.isErr)
    const customers =
        customerResultList
            .filter(Result.isOk)
            .map(Result.okValue)
    const customerInviteIds =
        customers
            .filter(c => (Coord.distance(FovPos, c.pos) <= CustomerInviteDistKM))
            .map(c => c.id)
            .sort()

    // log errors
    customerParseErrors
        .map(Result.errReason)
        .map(log("Error"))

    // Log all customers to invite
    customerInviteIds.map(log("Customer:"))
}

main()
