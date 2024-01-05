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
const prisma = new client_1.PrismaClient();
const SECRET = process.env.SECRET_S + "";
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
    const { q: query } = req.query;
    let m = "" + query;
    const notes = yield prisma.note.findMany({
        where: {
            content: {
                contains: m
            },
            authorId: user
        }
    });
    res.json({ notes, m });
    yield prisma.$disconnect();
}));
exports.default = router;
