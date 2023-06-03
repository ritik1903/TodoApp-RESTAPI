const { ObjectID } = require("mongodb");
const { Todo } = require("../../models/todo");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "andre@gmail.com",
    password: "useronepass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userOneId, access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "filipe@gmail.com",
    password: "usertwopass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userTwoId, access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: "First Todo",
    completed: false,
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "Second Todo",
    completed: "333",
    completedAt: new Date().getTime(),
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => {
      done();
    });
  });
};

const populateUsers = done => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
