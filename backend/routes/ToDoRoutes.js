const {Router} = require('express');
const { getToDo, saveToDo, updateToDo, deleteToDo } = require('../controllers/ToDoController');

const router = Router();  

const authenticate = (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) return res.status(401).json({ success: false, error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "Secret");
    req.email = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

router.get('/', getToDo)
router.post('/save', saveToDo)
router.put('/update/:id', updateToDo)
router.delete('/delete/:id', deleteToDo)

module.exports = router;