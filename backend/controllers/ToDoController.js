const ToDoModel = require("../models/ToDoModel");
const Users = require("../models/Users")


module.exports.getToDo = async (req, res) => {
  const user = await Users.findOne({email: req.email})
  const toDo = await ToDoModel.find({userId: user._id});
  res.send(toDo);
};

module.exports.saveToDo = async (req, res) => {
  // const user = await Users.findOne({email: req.email}).populate('todos')
  const { text, description, status } = req.body;
  ToDoModel.create(
    // { userId: user._id },
    { text, description, status }).then((data) => {
    console.log("Added Successfully...");
    console.log(data);
    res.send(data);
  });
};

module.exports.updateToDo = async (req, res) => {
  const { text, description, status } = req.body;
  const { id } = req.params;
  console.log(text, description, status ,id)
  try {
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      id,
      { text, description, status },
      { new: true }
    );
    res.json(updatedTodo); // send updated todo item back
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}; 

module.exports.deleteToDo = async (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted Sucessfully..."))
    .catch((err) => console.log(err));
};

