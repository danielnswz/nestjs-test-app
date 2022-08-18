import { Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumberString,
    ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddressDto.dto';

export class CreateCustomerDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsNotEmptyObject()
    address: CreateAddressDto;
}
