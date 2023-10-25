import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { Schema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      try {
        this.schema.parse(value);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new BadRequestException(error);
        }

        throw new BadRequestException(error);
      }
      return value;
    }
    return value;
  }
}
