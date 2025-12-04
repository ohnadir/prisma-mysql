import Prisma from "../config/prisma";
import config from "../config";
import { hashPassword } from "../utils/hashPassword";
import { ROLES } from "../enum/user";
import colors from 'colors';
import { logger } from "../utils/logger";

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
        logger.info(colors.green('Super admin created successfully!'));
    }else{
        logger.info(colors.green('Super Admin Seeded.'));
    }
};

export default seedSuperAdmin;