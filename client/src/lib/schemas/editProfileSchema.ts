import { z } from "zod";
import { requiredString } from "../util/util";

export const editProfileSchema = z.object({
  displayName: requiredString("displayName"),
  bio: z.string(),
});
export type EditProfileSchema = z.infer<typeof editProfileSchema>;
