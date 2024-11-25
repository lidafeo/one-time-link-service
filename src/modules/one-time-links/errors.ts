import ServerError from 'src/errors/server-error';
import ClientError from '../../errors/client-error';

export class LinkNotFoundOrNotActiveError extends ClientError {
  constructor() {
  	super('Link does not exist or is not active anymore.');
  }
}

export class CanNotGenerateUniqKey extends ServerError {
  constructor() {
  	super('Can not generate uniq key.');
  }
}