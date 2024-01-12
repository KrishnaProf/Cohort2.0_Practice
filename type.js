zod = require("zod");

function validate(obj) {
  const User = zod.object({
    name: zod.string(),
    age: zod.number(),
    email: zod.string().email(),
    password: zod.string().min(8),
  });

  const user = User.safeParse(obj);
  console.log(user);
}

validate({
  name: "Krishna",
  age: 20,
  email: "oqibz@example.com",
  password: "krishna@123",
});