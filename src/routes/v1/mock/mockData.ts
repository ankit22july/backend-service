export const mockApiResponses: { [key: string]: any } = {
  "/admin/user/list": {
    status: "success",
    data: [
      {
        _id: "5e9f8f8f8f8f8f8f8f8f8f8",
        name: "John Doe",
        roles: [
          {
            _id: "5e9f8f8f8f8f8f8f8f8f8f9",
            code: "ADMIN",
            name: "Admin",
            description: "Admin user",
          },
          {
            _id: "5e9f8f8f8f8f8f8f8f8f8fa",
            code: "USER",
            name: "User",
            description: "User user",
          },
        ],
      },
    ],
  },
  "/admin/user/:id": {
    status: "success",
    data: {
      _id: "5e9f8f8f8f8f8f8f8f8f8f8",
      name: "John Doe",
      roles: [
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8f9",
          code: "ADMIN",
          name: "Admin",
          description: "Admin user",
        },
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8fa",
          code: "USER",
          name: "User",
          description: "User user",
        },
      ],
    },
  },
  "/admin/user/:id/delete": {
    status: "success",
    data: {
      _id: "5e9f8f8f8f8f8f8f8f8f8f8",
      name: "John Doe",
      roles: [
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8f9",
          code: "ADMIN",
          name: "Admin",
          description: "Admin user",
        },
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8fa",
          code: "USER",
          name: "User",
          description: "User user",
        },
      ],
    },
  },
  "/user/:id/profile": {
    status: "success",
    data: {
      _id: "5e9f8f8f8f8f8f8f8f8f8f8",
      name: "John Doe",
      roles: [
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8f9",
          code: "ADMIN",
          name: "Admin",
          description: "Admin user",
        },
        {
          _id: "5e9f8f8f8f8f8f8f8f8f8fa",
          code: "USER",
          name: "User",
          description: "User user",
        },
      ],
    },
  },
  "/subject/list": {
    status: "success",
    data: [
      {
        _id: "5e9f8f8f8f8f8f8f8f8f8f8",
        name: "Math",
        description: "Math",
        tags: ["math", "maths"],
        createdBy: {
          _id: "5e9f8f8f8f8f8f8f8f8f8f9",
          name: "John Doe",
          roles: [
            {
              _id: "5e9f8f8f8f8f8f8f8f8f8f9",
              code: "ADMIN",
              name: "Admin",
              description: "Admin user",
            },
            {
              _id: "5e9f8f8f8f8f8f8f8f8f8fa",
              code: "USER",
              name: "User",
              description: "User user",
            },
          ],
        },
        createdAt: "2020-01-01T00:00:00.000Z",
        updatedAt: "2020-01-01T00:00:00.000Z",
      },
    ],
  },
  "/subject/:id/questions": {
    statusCode: "10000",
    message: "success",
    data: [
      {
        _id: "627123c3092d7cd12d975831",
        statement: "Which country has the largest area ?",
        isMCQ: true,
        options: ["India", "China", "US", "Russia"],
        answer: "4",
      },
      {
        _id: "627127ac45c30b3d10afd475",
        statement: "Which country has the largest population ?",
        isMCQ: true,
        options: ["India", "China", "US", "Russia"],
        answer: "2",
      },
      {
        _id: "62776f53b659fb766d220e8b",
        statement:
          "Tadoba national park known for sheltering tiger, panther and bear is located in:",
        isMCQ: true,
        options: [
          "Assam",
          "Chandrapur (Maharashtra)",
          "Karnataka",
          "Tamil Nadu",
        ],
        answer: "2",
      },
      {
        _id: "62776f53b659fb766d220e8c",
        statement: "Apatanis are the tribes found in:",
        isMCQ: true,
        options: [
          "Himanchal Pradesh",
          "Nagaland",
          "Sikkim",
          "Arunachal Pradesh",
        ],
        answer: "4",
      },
      {
        _id: "62776f53b659fb766d220e8d",
        statement:
          "Which one of the following river flows between Vindhyan and Satpura ranges?",
        isMCQ: true,
        options: ["Narmada", "Mahanadi", "Son", "Netravati"],
        answer: "1",
      },
      {
        _id: "62776f53b659fb766d220e8e",
        statement:
          "Which among the following headstreams meets the Ganges in last?",
        isMCQ: true,
        options: ["Alaknanda", "Pindar", "Mandakini", "Bhagirathi"],
        answer: "4",
      },
      {
        _id: "62776f53b659fb766d220e8f",
        statement: "Tsunamis are not caused by",
        isMCQ: true,
        options: [
          "Hurricanes",
          "Earthquakes",
          "Undersea landslides",
          "Volcanic eruptions",
        ],
        answer: "1",
      },
    ],
  },
  "/subject/manage": {
    statusCode: "10000",
    message: "success",
    data: {
      name: "General Awareness",
    },
  },
  "/question/post": {
    statusCode: "10000",
    message: "5 Questions added successfully",
  },
  "/author/exam/post": {
    statusCode: "10000",
    message: "GK Test Exam added successfully",
  },
  "/author/exam/get": {
    statusCode: "10000",
    message: "Exams fetched successfully",
    data: [],
  },
  "/user/public/id/:id": {
    statusCode: "10000",
    message: "success",
    data: {
      name: "Ram",
      profilePicUrl: "https://lh3.googleusercontent.com?ram=jpg",
    },
  },
  "/user/my/get": {
    statusCode: "10000",
    message: "success",
    data: {
      name: "Ram",
      profilePicUrl: "https://lh3.googleusercontent.com?ram=jpg",
      roles: [
        {
          _id: "626e2ff49356a3ba189b0e9f",
          code: "AUTHOR",
        },
      ],
    },
  },
  "/user/put": {
    statusCode: "10000",
    message: "Profile updated",
    data: {
      name: "Ram Singh",
      profilePicUrl: "https://lh3.googleusercontent.com?ram=jpg",
      roles: [
        {
          _id: "626e2ff49356a3ba189b0e9f",
          code: "AUTHOR",
        },
      ],
    },
  },
};
