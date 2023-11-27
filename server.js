// const express = require('express');
// const app = express();
// const bcrypt = require('bcrypt-nodejs')
// const cors = require('cors')
// const knex = require('knex')

// const register = require('./controllers/register')
// const signin= require('./controllers/signin')
// const profile = require('./controllers/profile')
// const image = require('./controllers/image')

// import  handleRegister from "./controllers/register.js";

import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import {handleApiCall,handleImage} from "./controllers/image.js";

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString:process.env.DATABASE_URL,
        ssl:{rejectUnauthorized :false},
        host:process.env.DATABASE_HOST,
        port:5432,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PW,
        database:process.env.DATABASE_DB
    }
});

app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>{
    res.send('success');
})

app.post('/signin',(req,res)=>{
    handleSignin(req,res,db,bcrypt)
})

app.post('/register',(req,res) => {
    handleRegister(req,res,db,bcrypt)
})

app.get('/profile/:id',(req,res)=>{
    handleProfileGet(req,res,db)
})

app.put('/image',(req,res)=>{
    handleImage(req,res,db)
})
app.post('/imageurl',(req,res)=>{
    handleApiCall(req,res)
})
app.listen(5432,()=>{
    console.log('app is running in port 5432');
})
