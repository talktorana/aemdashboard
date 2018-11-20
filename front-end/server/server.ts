import * as express from 'express';
import {Application} from "express";
import {getBrands} from "./getBrands.route";


const app: Application = express();


app.route('/etc/acmselfservice/tools/jcr:content.getBrands.json').get(getBrands);

const httpServer = app.listen(9001, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




