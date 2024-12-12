import type { User as UserDTO } from "@prisma/client";

export type UserWithoutPassword = Omit<UserDTO, "password">;
