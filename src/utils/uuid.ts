import { validate } from 'uuid';

export function validateId(id: string): boolean {
  return validate(String(id));
}
