const express = require("express");
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  console.log("inside url control", req.user);
  const url = req.body.url;
  console.log(url , "url")
  //if(!url) return res.status(400).json({error : "url not sent"});
  const existingUrl = await URL.findOne({ redirectUrl: url, CreatedBy: req.user.id });
  
  if (existingUrl) {
    // If the URL already exists, return the existing short id;
   
    return res.render("home", { id: existingUrl.shortId  , url:existingUrl.redirectUrl});
  } 
    const shortID = shortid.generate();
    await URL.create({
      shortId: shortID,
      redirectUrl: url,
      visitHistory: [],
      CreatedBy: req.user.id,
    });
    // return res.render("home" , {id : shortID});
    return res.redirect("/");
}


async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortid;
  const result = await URL.findOne({ shortId: shortID });
  return res.json({
    clicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleUrlDelete(req, res) {
  console.log(req.body.delete);
  const id = req.body.delete;
  await URL.deleteOne({ shortId: id });
  console.log("Deleted");
  return res.redirect("/");
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleUrlDelete,
};
