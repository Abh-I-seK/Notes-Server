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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const SECRET = process.env.SECRET_S + "";
const prisma = new client_1.PrismaClient();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    let notes = yield prisma.note.findMany({
        where: {
            authorId: user
        }
    });
    res.json({ notes });
    yield prisma.$disconnect();
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    const id = parseInt(req.params.id);
    let notes = yield prisma.note.findMany({
        where: {
            authorId: user,
            id: id
        }
    });
    res.json({ notes });
    yield prisma.$disconnect();
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    const { content } = req.body;
    yield prisma.note.create({
        data: {
            content: content,
            authorId: user
        }
    });
    res.json({ message: "New Note Added !!" });
    yield prisma.$disconnect();
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    const id = parseInt(req.params.id);
    const { content } = req.body;
    let notes = null;
    try {
        notes = yield prisma.note.update({
            where: {
                authorId: user,
                id: id
            },
            data: {
                content: content
            }
        });
    }
    catch (_e) {
        yield prisma.$disconnect();
        res.status(403).json({ message: "you do not have a note with that id !!!" });
        return;
    }
    res.json({ message: "Note updated !!", notes });
    yield prisma.$disconnect();
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const token = (_f = req.headers.authorization) === null || _f === void 0 ? void 0 : _f.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    const id = parseInt(req.params.id);
    let notes = null;
    try {
        notes = yield prisma.note.delete({
            where: {
                authorId: user,
                id: id
            },
        });
    }
    catch (_g) {
        yield prisma.$disconnect();
        res.status(403).json({ message: "you do not have a note with that id !!" });
        return;
    }
    res.json({ message: "Note deleted !!", notes });
    yield prisma.$disconnect();
}));
router.post("/:id/share", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const token = (_h = req.headers.authorization) === null || _h === void 0 ? void 0 : _h.split(' ')[1];
    let user = null;
    // Authentication
    if (token) {
        var a = undefined;
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            a = payload;
        });
        if (!a) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        let m = yield prisma.user.findUnique({
            where: {
                token: token,
            }
        });
        if (!m) {
            yield prisma.$disconnect();
            res.status(403).json({ message: "Login or Signup" });
            return;
        }
        user = m.id;
    }
    else {
        yield prisma.$disconnect();
        res.status(403).json({ message: "Login or Signup" });
        return;
    }
    // 
    const id = parseInt(req.params.id);
    let content = null;
    // passing the id of the user to pass the id to in body
    const shareTO = parseInt(req.body.shareToUser);
    const check = yield prisma.user.findUnique({
        where: {
            id: shareTO
        }
    });
    if (check) {
        let notes = yield prisma.note.findUnique({
            where: {
                authorId: user,
                id: id
            }
        });
        if (!notes) {
            res.status(403).json({ message: "Incorrect id for note !!" });
            yield prisma.$disconnect();
            return;
        }
        content = notes.content;
        yield prisma.note.create({
            data: {
                content: content,
                authorId: shareTO
            }
        });
        res.json({ message: "Note updated !!", notes });
        yield prisma.$disconnect();
    }
    else {
        res.status(403).json({ message: "Incorrect id for note !!" });
        yield prisma.$disconnect();
        return;
    }
}));
exports.default = router;
