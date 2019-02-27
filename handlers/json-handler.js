"use strict"

const request = require('request');
const url = require('url');
const systempath = require('path');
const mime = require('mime-types');
const fs = require('fs');

const returnForm = (req, res, next) =>{
   console.log('client gui len bien so',req.paramS);

    //req.ipInfo 
  let jsonLogin ={
    a:"afasdg"
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(jsonLogin));
}



module.exports = {
    returnForm: returnForm
};