import { prisma } from "../../../../generated/prisma-client";

export default {
     Query : {
         userById : async(_, args) => {
             const { id } = args;
             return await prisma.user({ id }); // user({id:id}) js문법으로 축약 가능
         }
     }
 };