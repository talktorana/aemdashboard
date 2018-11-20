import {Request, Response} from 'express';
import {BRANDS} from "./brands-data";

export function getBrands(req: Request, res: Response) {

    res.status(200).json({brands:Object.values(BRANDS)});

}