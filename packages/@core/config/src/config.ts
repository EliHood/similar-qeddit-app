import { z } from 'zod';

export const config = z.object({
    publicUrl: z.string().url(),
    backendUrl: z.string().url(),
});

export type Config = z.infer<typeof config>;
