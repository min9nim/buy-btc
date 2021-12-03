module.exports = fn => async (req, res) => {
  try{
    return await fn(req, res)
  }catch (e){
    // console.error(e)
    console.error(e.message)
    res.status(401).json({ message:e.message })
  }
}
