import { Customer } from "../db/entities/Customer"
import { AppError } from "../errors/AppErrors"
import { Response, Request } from "express"


const createCustomer = async (payload: Customer) => {
    const customer = await Customer.findOne({
        where: {
            mobilePhone: payload.mobilePhone
        }
    })

    if (customer) {
        throw new AppError("This customer is already exists!", 409, true)
    }

    const newCustomer = Customer.create(payload)
    return newCustomer.save()
}


const removeCustomer = async (id: number) => {
    const customer = await Customer.findOne({
        where: {
            id: id
        }
    })
    if (!customer) {
        throw new AppError("Customer not found!", 404, true)
    }
    return customer.remove()
}
const editCustomer = async (id: number, payload: Customer) => {
    const customer = await Customer.findOne({
        where: {
            id: id
        }
    })

    if (!customer) {
        throw new AppError("Customer not found", 404, true)
    }

    if (payload.name && payload.mobilePhone && payload.balance) {
        customer.name = payload.name,
            customer.mobilePhone = payload.mobilePhone,
            customer.balance = payload.balance
    }
    return customer.save()
}



const getCustomer = (req: Request, res: Response) => {
    const customerId = Number(req.params.id);

    const customer = Customer.findOne({
        where: {
            id: customerId
        }
    })

    if (!customer) {
        throw new AppError("Customer not found!", 404, true)
    }

    res.json(
        {
            message: "Getting customer by ID",
            customer: customer
        }
    )
}

const getAllCustomers = async (req: Request, res: Response) => {
    const customers = await Customer.find()

    res.json(
        {
            message: "Getting all customers",
            customers: customers
        }
    )

}



export { createCustomer, editCustomer, getCustomer, removeCustomer, getAllCustomers, }