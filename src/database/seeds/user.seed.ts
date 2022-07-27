import { UserRepository } from 'src/repositories';

const USER = [
    {
        name: 'soda',
    },
    {
        name: 'haha',
    },
];

export class ChainSeed {
    async run() {
        for (const i in USER) {
            await this.insertChainItem(USER[i]);
        }
        console.log('Seed chain success');
    }

    async insertChainItem(item) {
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
