const express = require("express");
const shortid = require('shortid');
const URL = require("../models/url");


async function handleGenerateNewShortUrl(req, res){
    const url = req.body.url;
    //if(!url) return res.status(400).json({error : "url not sent"});
    const existingUrl = await URL.findOne({ redirectUrl : url });
    console.log(existingUrl);
    if ( existingUrl ) {
      // If the URL already exists, return the existing short id
      return res.render("home" , {id : existingUrl.shortId});
    } else {

    const shortID = shortid.generate();
     await URL.create({
        shortId  :shortID,
        redirectUrl : url,
        visitHistory: [],
     });
     return res.render("home" , {id : shortID});
    
};}


async function handleGetAnalytics(req,res){
    
    const shortID =  req.params.shortid; 
    const result = await URL.findOne({shortId :shortID});
    return res.json({clicks : result.visitHistory.length , analytics: result.visitHistory});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}