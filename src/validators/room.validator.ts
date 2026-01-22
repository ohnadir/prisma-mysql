import { z } from "zod";

export const createRoomSchema = z.object({
    body: z.object({
        participants: z.array(z.string({error: "Participant is required"})).nonempty("Participants are required")
    })
});