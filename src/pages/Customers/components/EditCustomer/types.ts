import { ActionCustomer } from "../../types"

export type EditCustomerType = {
    actionCustomer: ActionCustomer,
    setActionCustomer: (e: ActionCustomer | null) => void;
}