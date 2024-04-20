import * as moment from "moment";
import  * as bcrypt from "bcrypt";
import bcryptConfig from "../config/bcrypt.config"

exports.seed = function (knex) {
    return knex('users').where({ email: 'dev+admin@bitcot.com' }).select().then(function (rows) {
        console.log('rows')
        console.log(rows)
        if (rows.length === 0) {
            const password = '123456';
            return knex('users').insert([
                {
                    first_name: 'Dev',
                    last_name: 'Admin',
                    email: 'dev+admin@bitcot.com',
                    password: bcrypt.hashSync(password, bcryptConfig.hashRound),
                    role: 'admin',
                    created_at: moment(),
                    updated_at: moment()
                }]).then(function () {
                    return knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 2`)
                });
        }
    })
};
