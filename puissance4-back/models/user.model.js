const Redis = require('ioredis');
const config = require('config');
const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD } = config.get('database.redis');
const redis = new Redis(REDIS_PORT, REDIS_URL, {
    password: REDIS_PASSWORD
});

const async = require('async');

class User {

    static async getUser(socketId) {
        try {
            const user = await redis.get(socketId);
            return user;
        } catch (e) {
            console.log(e);
        }
    }
    static async getUsers() {
        const keys = await redis.keys('*');

        return async.map(keys,async (key) => {
            return await redis.get(key);
        });
    }
    static async delete(socketId) {
        return redis.del(socketId);
    }
    static async verifyExistingName(username) {
        const users = await User.getUsers();
        return users.includes(username);
    }

    constructor(socketId, name) {
        this.name = name;
        this.socketId = socketId;
    }
    addUser() {
        return redis.set(this.socketId, this.name);
    }
    deleteUser() {
        return redis.del(this.socketId);
    }

}

module.exports = User;
