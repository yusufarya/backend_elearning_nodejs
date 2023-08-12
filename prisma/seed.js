import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient()

async function main()
{
    const admin = await prismaClient.userrole.upsert({
        create: {
            id : 1,
            role : "Admin"
        }
    })
    const teacher = await prismaClient.userrole.upsert({
        create: {
            id : 2,
            role : "Teacher"
        }
    })
    const student = await prismaClient.userrole.upsert({
        create: {
            id : 3,
            role : "Student"
        }
    })

    console.log({ admin, teacher, student })
}

main()
.then( async () => {
    await prismaClient.$disconnect()
})
.catch( async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
})