import User from './model/user.js';
import bcrypt from 'bcrypt';
import conntectDB from './db/db.js';

const  userRegister = async () => {
    try {
        conntectDB();
        const hashedPassword = await bcrypt.hash('admin', 10);
        const user = new User({
            name: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            isAdmin: true,
        });
        await user.save();
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

userRegister();