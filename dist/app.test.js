"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("./index"));
describe("Test app.ts", () => {
    test("Catch-all route", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/");
        expect(res.statusCode).toBe(200);
    }));
});
describe("POST Signup Req", () => {
    test("if both username and password are exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/auth/signup").send({ username: "newUser", password: "password" });
        expect(res.statusCode).toBe(200);
    }));
});
let token = null;
describe("POST login Req", () => {
    test("if both username and password are exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/auth/login").send({ username: "newUser", password: "password" });
        token = res.body.token;
        expect(res.statusCode).toBe(200);
    }));
});
describe("POST create Note", () => {
    test("if new note created or not ?!", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/notes").set("Authorization", `Bearer ${token}`).send({ content: "Sample for test" });
        expect(res.statusCode).toBe(200);
    }));
});
describe("Get all note", () => {
    test("GET all notes created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/notes").set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
describe("GET all note for specific ID", () => {
    test("Get the note with a specific ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/notes/1").set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
describe("PUT new updates note", () => {
    test("Update the Note ,given the id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).put("/notes/1").set("Authorization", `Bearer ${token}`).send({ content: "Updated for test" });
        expect(res.statusCode).toBe(200);
    }));
});
describe("DELETE a Note", () => {
    test("Delete the Note", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).delete("/notes/1").set("Authorization", `Bearer ${token}`);
        const res2 = yield (0, supertest_1.default)(index_1.default).post("/notes").set("Authorization", `Bearer ${token}`).send({ content: "Sample for Sharing" });
        expect(res.statusCode).toBe(200);
        expect(res2.statusCode).toBe(200);
    }));
});
describe("Share a note", () => {
    test("Share the note to a User", () => __awaiter(void 0, void 0, void 0, function* () {
        const res2 = yield (0, supertest_1.default)(index_1.default).post("/auth/signup").send({ username: "TesterForShare", password: "password" });
        const res = yield (0, supertest_1.default)(index_1.default).post("/notes/2/share").set("Authorization", `Bearer ${token}`).send({ shareToUser: 2 });
        expect(res2.statusCode).toBe(200);
        expect(res.statusCode).toBe(200);
    }));
});
describe("GET all note for specific Search Query", () => {
    test("Get the note that contains the required word", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/search?q=sample").set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    }));
});
