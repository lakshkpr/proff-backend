const asynchandler=(requesthandler)=> (req, res, next)=> {
    Promise.resolve(
        (requesthandler(req, res, next))
    )
    .reject((error)=>{
        next(error)
    })
}

export {asynchandler}