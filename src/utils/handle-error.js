module.exports = fn => async (req, res) => {
  try{
    return await fn(req, res)
  }catch (e){
    res.status(401).json({ message:e.message })
  }
}
