import { generate } from 'randomstring';

export default function generateLinkKey(length: number) {
  return generate({
    length,
    charset: 'alphanumeric',
  });
}