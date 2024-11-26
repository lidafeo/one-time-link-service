import { generate } from 'randomstring';

export default function generateLinkKey(length: number): string {
  return generate({
    length,
    charset: 'alphanumeric',
  });
}