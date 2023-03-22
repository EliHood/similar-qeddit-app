import { z } from 'zod';

export const config = z.object({
    backendUrl: z.string().url(),
});

export type Config = z.infer<typeof config>;
