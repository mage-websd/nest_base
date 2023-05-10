import { UserRepository } from 'src/repositories';

const USER = [
    {
        name: 'soda',
    },
    {
        name: 'haha',
    },
];

export class UserSeed {
    async run() {
        for (const i in USER) {
            await this.insertUserItem(USER[i]);
        }
        console.log('Seed user success');
    }

    async insertUserItem(item: any) {
        const chainItem = await UserRepository.findOne({
            where: {
                name: item.name,
            },
        });
        if (!chainItem) {
            const newItem = UserRepository.create(item);
            console.log('seed chain item', newItem);
            await UserRepository.save(newItem);
        }
    }
};
