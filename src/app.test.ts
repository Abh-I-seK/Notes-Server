import  request  from "supertest";
import app from "./index";  

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST Signup Req",()=>{
  test("if both username and password are exists" , async()=>{
    const res = await request(app).post("/auth/signup").send({username : "newUser" , password : "password"});
    expect(res.statusCode).toBe(200);
    
  });
});

let token : any = null;
describe("POST login Req",()=>{
  test("if both username and password are exists" , async()=>{
    const res = await request(app).post("/auth/login").send({username : "newUser" , password : "password"});
    token = res.body.token;
    expect(res.statusCode).toBe(200);
    
  });
}); 

describe("POST create Note" , ()=>{
  test("if new note created or not ?!" , async()=>{
    const res = await request(app).post("/notes").set("Authorization", `Bearer ${token}`).send({content : "Sample for test"});
    expect(res.statusCode).toBe(200);
  })
})

describe("Get all note", ()=>{
  test("GET all notes created" , async()=>{
    const res = await request(app).get("/notes").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  })
})

describe("GET all note for specific ID", ()=>{
  test("Get the note with a specific ID" , async()=>{
    const res = await request(app).get("/notes/1").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  })
});


describe("PUT new updates note", ()=>{
  test("Update the Note ,given the id" , async()=>{
    const res = await request(app).put("/notes/1").set("Authorization", `Bearer ${token}`).send({content : "Updated for test"});
    expect(res.statusCode).toBe(200);
  })
});

describe("DELETE a Note" , ()=>{
  test("Delete the Note" , async()=>{
    const res = await request(app).delete("/notes/1").set("Authorization", `Bearer ${token}`);
    const res2 = await request(app).post("/notes").set("Authorization", `Bearer ${token}`).send({content : "Sample for Sharing"});
    expect(res.statusCode).toBe(200);
    expect(res2.statusCode).toBe(200);
  })
});

describe("Share a note", ()=>{
  test("Share the note to a User" , async()=>{
    const res2 = await request(app).post("/auth/signup").send({username : "TesterForShare" , password : "password"});
    const res = await request(app).post("/notes/2/share").set("Authorization", `Bearer ${token}`).send({shareToUser : 2});
    expect(res2.statusCode).toBe(200);
    expect(res.statusCode).toBe(200);
  })
});

describe("GET all note for specific Search Query", ()=>{
  test("Get the note that contains the required word" , async()=>{
    const res = await request(app).get("/search?q=sample").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  })
});

