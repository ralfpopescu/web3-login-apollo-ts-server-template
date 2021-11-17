import express from 'express';
import cors from 'cors';

export const getApp = () => {
    const app = express()
    app.use(cors());
    return app;
}
