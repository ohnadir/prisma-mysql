import Prisma from "../config/prisma";
import config from "../config";
import { hashPassword } from "../util/hashPassword";
import { ROLES } from "../enum/user";


const superUser = {
    name: config.admin.name,
    role: ROLES.SUPER_ADMIN,
    email: config.admin.email,
    password: config.admin.password!,
};

const seedSuperAdmin = async () => {

    superUser.password = await hashPassword(superUser.password);

    const isExistAdmin = await Prisma.user.findFirst({
        where: {
            role: ROLES.SUPER_ADMIN
        }
    });

    if (!isExistAdmin) {
        await Prisma.user.create({
            data: superUser
        });
        console.log('Super admin created successfully!');
    }else{
        console.log('Super Admin Exist!');
    }
};

export default seedSuperAdmin;