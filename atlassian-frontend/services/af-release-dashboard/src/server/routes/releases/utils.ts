import { Request } from 'express';
import { FindAllParams } from '../../services/releases/types';
import { BadRequestException } from '../../middleware/errors/exceptions';

export const buildFindAllParams = (request: Request): FindAllParams => {
  const params: FindAllParams = {
    page: 1,
    withPullRequests: request.query.expand === 'pull_requests',
  };
  if (request.query.size && typeof request.query.size === 'string') {
    params.size = Number.parseInt(request.query.size, 10);
    if (Number.isNaN(params.size)) {
      throw new BadRequestException('The "size" parameter should be a number');
    }

    if (request.query.page && typeof request.query.page === 'string') {
      params.page = Number.parseInt(request.query.page, 10);
      if (Number.isNaN(params.page)) {
        throw new BadRequestException(
          'The "page" parameter should be a number',
        );
      }
      if (params.page < 1) {
        throw new BadRequestException(
          'The "page" parameter cannot be less than 1',
        );
      }
    }
  }
  return params;
};
