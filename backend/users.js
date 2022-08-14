import bcrypt from 'bcrypt';
const users = [
    {
        username: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        is_admin: true
    },
    {
        username: 'Jhon',
        email: 'jhon@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        username: 'Jane',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]
export default users