import express from 'express'; 
import {userRouter} from '../route/api.js'

export const app = express();
app.use(express.json());

app.use(userRouter)