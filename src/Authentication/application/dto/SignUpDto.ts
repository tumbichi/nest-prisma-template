import { z } from 'zod';
import SignUpSchema from 'Authentication/application/schema/SignUpSchema';

type SignUpDto = Required<z.infer<typeof SignUpSchema>>;

export default SignUpDto;
