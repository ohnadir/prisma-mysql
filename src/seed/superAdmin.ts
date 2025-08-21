import { Role } from "@prisma/client";
import Prisma from "../config/prisma";
import config from "../config";
import { hashPassword } from "../util/hashpassword";


const superUser =  {
    name: config.admin.name,
    role: Role.SUPER_ADMIN,
    email: config.admin.email,
    password: config.admin.password!,
};

const seedSuperAdmin = async () => {

    superUser.password = await hashPassword(superUser.password);

    const isExistAdmin = await Prisma.user.findFirst({
        where: {
            role: Role.SUPER_ADMIN
        }
    });

    if (isExistAdmin) {
        console.log('Super admin already exists!');
    }else{
        await Prisma.user.create({
            data: superUser 
        });
        console.log('Super admin created successfully!');
    }
};

export default seedSuperAdmin;