import { Request, Response, NextFunction } from 'express';

interface Page {
  current: number;
  size: number;
  total: number;
  totalPages: number;
}

declare global {
  namespace Express {
    interface Response {
      locals: {
        data?: any[];
      };
    }
  }
}

function addPageInfo(req: Request, res: Response, next: NextFunction) {

    const pageInt = parseInt(req.query.page as string, 10) || 1;
    const pageSizeInt = parseInt(req.query.pageSize as string, 10) || 1;


    res.locals.data = {
      ...res.locals.data,
      page: {
        current: pageInt,
        size: pageSizeInt,
      } as Page
    };
  

  next();
}

export default addPageInfo;