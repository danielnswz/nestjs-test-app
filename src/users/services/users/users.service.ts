import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: 'anson',
            password: '321654',
        },
        {
            username: 'danielnswz',
            password: '323212',
        },
        {
            username: 'dklie',
            password: '764523',
        },
        {
            username: 'superpan',
            password: '895623',
        },
    ];

    getUsers(): User[] {
        return this.users.map((user) => new SerializedUser(user));
    }

    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username);
    }
}
