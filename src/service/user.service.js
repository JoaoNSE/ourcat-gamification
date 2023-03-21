import db from "../models";

function removePassword(user) {
    if (user?.password) {
        delete user.password;
    }

    return user;
}

async function getUsers() {
    return db.User.findAll();
}

async function findUserByEmailAndPassword(email, password) {
    let user = await db.User.findOne({
        where: {
            email: email,
            password: password,
        },
    });

    return removePassword(user.dataValues);
}

async function findUserById(id) {
    const user = await db.User.findByPk(id);
    return removePassword(user.dataValues);
}

async function findUserCourses(userId) {
    let courses = await db.Course.findAll({
        where: {
            "$userCourseModules.userId$": userId,
        },
        include: [{ model: db.UserCourseModules }],
    });

    courses = await Promise.all(
        courses.map(async (course) => {
            let nCourse = course.dataValues;
            const modules = await course.getModules();
            nCourse.modules = nCourse.UserCourseModules.map((module) => {
                const compMod = modules.find((m) => m.id === module.moduleId);

                return {
                    id: compMod.id,
                    title: compMod.title,
                    experience: compMod.experience,
                    completed: module.completed ? true : false,
                    earnedXp: module.earnedXp,
                };
            });

            delete nCourse.UserCourseModules;
            return nCourse;
        })
    );

    return courses;
}

export default Object.freeze({
    getUsers,
    findUserByEmailAndPassword,
    findUserById,
    findUserCourses,
});
