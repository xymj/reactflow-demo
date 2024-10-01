// src/mocks/handlers.js
import { http, HttpResponse } from "msw";
import Mock from "mockjs";

const userData = Mock.mock({
  "list|10": [
    {
      "id|10000-99999": 1,
      name: "@name",
      "age|20-40": 1,
      "gender|1": ["Male", "Female"],
      address: "@county(true)",
      phone: /^1[385][1-9]d{8}/,
      "tags|1": ["nice", "developer", "loser", "cool", "teacher"],
    },
  ],
});

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/api/users", () => {
    // ...and respond to them using this JSON response.
    console.log("/api/users");
    return HttpResponse.json({
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ],
    });
  }),

  //  你可以添加更多的请求处理程序
  http.post("/api/users", async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = await request.json();

    // Push the new post to the map of all posts.
    // allPosts.set(newPost.id, newPost);
    const newUser = {
      ...newPost,
      id: Math.floor(Math.random() * 1000), // 模拟一个新的用户 ID
    };

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.get("/api/user/list", () => {
    console.log("/api/user/list");
    return HttpResponse.json(userData);
  }),

  // http.post("/api/users", (req, res, ctx) => {
  //   const newUser = req.body;
  //   console.log("post /api/users");
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       id: Math.floor(Math.random() * 1000), // 模拟一个新的用户 ID
  //       ...newUser,
  //     })
  //   );
  // }),
];

// export const handlers = [
// rest.get("/api/users", (req, res, ctx) => {
//   return res(
//     ctx.status(200),
//     ctx.json({
//       users: [
//         { id: 1, name: "Alice" },
//         { id: 2, name: "Bob" },
//         { id: 3, name: "Charlie" },
//       ],
//     })
//   );
// }),
// // 你可以添加更多的请求处理程序
// rest.post("/api/users", (req, res, ctx) => {
//   const newUser = req.body;
//   return res(
//     ctx.status(201),
//     ctx.json({
//       id: Math.floor(Math.random() * 1000), // 模拟一个新的用户 ID
//       ...newUser,
//     })
//   );
// }),
// // 其他 HTTP 方法和路径处理程序
// rest.get("/api/users2", (req, res, ctx) => {
//   const { search } = req.url.searchParams;
//   const allUsers = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Charlie" },
//   ];
//   const filteredUsers = search
//     ? allUsers.filter((user) =>
//         user.name.toLowerCase().includes(search.toLowerCase())
//       )
//     : allUsers;
//   return res(
//     ctx.status(200),
//     ctx.json({
//       users: filteredUsers,
//     })
//   );
// }),
// rest.get("/api/users/:id", (req, res, ctx) => {
//   const { id } = req.params;
//   const user = { id, name: `User ${id}` };
//   return res(ctx.status(200), ctx.json(user));
// }),
// ];
