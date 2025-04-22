import { z } from "zod";
import { requiredString } from "../util/util";



export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.coerce
    .date({ message: "Date is required!" })
    .min(new Date(), "Date must be in the future!"),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    latitude: z.coerce
      .number()
      .min(-90, "Latitude must be greater than -90")
      .max(90, "Latitude must be less than 90"),
    longitude: z.coerce
      .number()
      .min(-180, "Longitude must be greater than -90")
      .max(180, "Longitude must be less than 90"),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
