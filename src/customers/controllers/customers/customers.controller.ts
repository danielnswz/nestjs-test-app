import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { createReadStream } from 'fs';
import { join } from 'path';
// import xml2js from 'xml2js';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get(':id')
    getCustomer(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
        const customer = this.customersService.findCustomerById(id);
        if (!customer) {
            return res.status(404).send({ msg: 'Customer not found' });
        }
        return res.send(customer);
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customersService.findCustomerById(id);
        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }
        return customer;
    }

    @Get('')
    getAllCustomers() {
        return this.customersService.getAllCustomers();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() body: CreateCustomerDto) {
        return this.customersService.createCustomer(body);
    }

    @Post('testing-retries-failure')
    @HttpCode(HttpStatus.OK)
    async testingrRetries(@Res() res) {
        const file = createReadStream(join(__dirname, 'xmlResponse_failure.xml'));
        file.pipe(res);
    }

    @Post('testing-retries-success')
    @HttpCode(HttpStatus.OK)
    async testingrRetriesSuccess(@Res() res) {
        const file = createReadStream(join(__dirname, 'xmlResponse_success.xml'));
        file.pipe(res);
    }
}
