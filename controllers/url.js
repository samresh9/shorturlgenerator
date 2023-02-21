const express = require("express");
const shortid = require('shortid');
const URL = require("../models/url");


async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "url not sent"});
    const shortID = shortid.generate();
     await URL.create({
        shortId  :shortID,
        redirectUrl : body.url,
        visitHistory: [],
     })
    return res.json({id : shortID}); 
}

async function handleGetAnalytics(req,res){
    
    const shortID =  req.params.shortid; 
    const result = await URL.findOne({shortId :shortID});
    return res.json({clicks : result.visitHistory.length , analytics: result.visitHistory});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}