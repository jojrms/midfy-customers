import { Customer } from "../../api/types"

export type ActionCustomer = {
    action: 'edit' | 'delete',
    customer: Customer
}