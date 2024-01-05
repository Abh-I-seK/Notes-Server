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
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            username: username
        }
    });
    if (user) {
        res.status(403).json({ msg: "username already Exists" });
        yield prisma.$disconnect();
        return;
    }
    var u = yield prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });
    res.json({ message: "User created !!", username });
    yield prisma.$disconnect();
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username: username }, SECRET, { expiresIn: '1h' });
        yield prisma.user.update({
            where: {
                username: username,
                password: password
            },
            data: {
                token: token
            },
        });
        res.json({ message: 'Logged in successfully', token });
        yield prisma.$disconnect();
        return;
    }
    res.status(403).json({ message: "Invalid username or Password" });
    yield prisma.$disconnect();
}));
exports.default = router;
