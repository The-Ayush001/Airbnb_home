exports.pageNotFound = (req,res,next) => {
  res.status(404)  //going to 404 html page.
  // res.sendFile(path.join(rootDir,'views','404.html')) // ejs -> remove sendfile and add render

  res.render('404',{pageTitle:'Page Not Found', currentPage:'404 Error'})
}