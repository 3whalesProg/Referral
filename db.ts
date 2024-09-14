import Knex from 'knex'
import knexConfig from './knexconfig'

const knex = Knex(knexConfig)

export default knex;
