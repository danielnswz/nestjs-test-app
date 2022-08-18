import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id: 1,
            email: 'daniel.klie@yopmail.com',
            name: 'Daniel Klie',
        },
        {
            id: 2,
            email: 'dklie192@gmail.com',
            name: 'Danny Klie',
        },
        {
            id: 3,
            email: 'danielnswz@gmail.com',
            name: 'Daniel Nswz',
        },
    ];

    getAllCustomers() {
        return this.customers;
    }

    findCustomerById(id: number) {
        return this.customers.find((user) => user.id === id);
    }

    createCustomer(customerDto: CreateCustomerDto) {
        this.customers.push(customerDto);
    }
}
