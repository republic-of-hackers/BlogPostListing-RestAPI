const express = require('express')
const path = require('path')
const app = express()

app.use('/',express.static(path.join(__dirname,'static')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','hbs')

let blogs = []

app.get('/up/:titleitem', (req, res)=>{
    console.log("UP REQUEST CALLED")
    let idx = undefined
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].title === req.params.titleitem){
            if(i === 0)
                break
            let temp = blogs[i-1]
            blogs[i-1] = blogs[i]
            blogs[i] = temp
            break
        }
    }
    res.redirect('/')
})

app.get('/down/:titleitem', (req, res)=>{
    console.log("DOWN REQUEST CALLED")
    let idx = undefined
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].title === req.params.titleitem){
            if(i === (blogs.length - 1))
                break
            let temp = blogs[i+1]
            blogs[i+1] = blogs[i]
            blogs[i] = temp
            break
        }
    }
    res.redirect('/')
})

app.put('/update/:titleitem', (req, res)=>{
    console.log("UPDATE REQUEST CALLED")
    let u_idx = undefined
    for(let i=0; i<blogs.length; i++){
        console.log(`update for ${req.params.titleitem}`)
        if(blogs[i].title === req.params.titleitem){
            u_idx = i;
            break
        }
    }
    blogs[u_idx].title = req.body.title
    blogs[u_idx].author = req.body.author
    blogs[u_idx].category = req.body.category
    blogs[u_idx].email = req.body.email
    blogs[u_idx].content = req.body.content
    blogs[u_idx].dateupload = req.body.dateupload
    res.redirect('/')
})



app.delete('/delete/:delitem', (req, res)=>{
    console.log("DELETE REQUEST CALLED")
    let d_idx = undefined
    for(let i=0; i<blogs.length; i++){
        console.log(`compare with ${req.params.delitem}`)
        if(blogs[i].title === req.params.delitem){
            d_idx = i
            break
        }
    }
    blogs.splice(d_idx, 1)
    res.redirect("/")
})

app.post('/add', (req, res)=>{
    console.log("POST REQUEST CALLED")
    blogs.push({
        title: req.body.title,
        category: req.body.category,
        email: req.body.email,
        author: req.body.author,
        content: req.body.content,
        dateupload: req.body.dateupload,
    })
    if(req.body.ssr === 'y'){
        res.redirect('/site')

    } else {
        res.redirect('/')
    }
})

app.get('/site', (req, res)=>{
    if(req.query.mode == 'json') {
        console.log("GET REQUEST CALLED IN JSON MODE ")
        res.send(blogs)
    } else {
        console.log("GET REQUEST CALLED IN SSR MODE")
        res.render('blog', {
            title: "Blog App",
            blogs
        })
    }
})

// SSR Rendering operations

app.post('/updatepage', (req, res)=>{
    console.log("UPDATE PAGE REQUEST CALLED IN SSR MODE")
    res.render('editblog', {
        title: "Edit Blog",
        itemtitle: req.body.updateitem,
    })
})

app.post('/update', (req, res)=>{
    console.log("UPDATE REQUEST CALLED IN SSR MODE")
    let u_idx = undefined
    for(let i=0; i<blogs.length; i++){
        console.log(`update for ${req.body.titleitem}`)
        if(blogs[i].title === req.body.titleitem){
            u_idx = i;
            break
        }
    }
    blogs[u_idx].title = req.body.title
    blogs[u_idx].author = req.body.author
    blogs[u_idx].category = req.body.category
    blogs[u_idx].email = req.body.email
    blogs[u_idx].content = req.body.content
    blogs[u_idx].dateupload = req.body.dateupload
    res.redirect('/site')
})

app.post('/delete', (req, res)=>{
    console.log("DELETE CALLED IN SSR MODE")
    let d_idx = undefined
    for(let i=0; i<blogs.length; i++){
        console.log(`compare with ${req.body.delitem}`)
        if(blogs[i].title === req.body.delitem){
            d_idx = i
            break
        }
    }
    blogs.splice(d_idx, 1)
    res.redirect("/site")
})

app.post('/up', (req, res)=>{
    console.log("UP REQUEST CALLED IN SSR MODE")
    let idx = undefined
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].title === req.body.titleitem){
            if(i === 0)
                break
            let temp = blogs[i-1]
            blogs[i-1] = blogs[i]
            blogs[i] = temp
            break
        }
    }
    res.redirect('/site')
})

app.post('/down', (req, res)=>{
    console.log("DOWN REQUEST CALLED IN SSR MODE")
    let idx = undefined
    for(let i=0; i<blogs.length; i++){
        if(blogs[i].title === req.body.titleitem){
            if(i === (blogs.length - 1))
                break
            let temp = blogs[i+1]
            blogs[i+1] = blogs[i]
            blogs[i] = temp
            break
        }
    }
    res.redirect('/site')

})

app.listen(3333, ()=>{
    console.log("Server Started at https://localhost:3333")
})