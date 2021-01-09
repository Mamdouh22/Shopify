import bcrypt from 'bcryptjs'
const users =[
    {
        name: 'Admin User',
        email: 'Admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Alaa',
        email: 'Alaa@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Ahmed User',
        email: 'Ahmed@example.com',
        password: bcrypt.hashSync('123456',10),
    },
]
export default users