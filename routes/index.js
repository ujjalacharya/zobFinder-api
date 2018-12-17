const Router = require('express').Router();

Router.get("/", (req, res)=>{
  res.json('Sup')
})

export default Router;