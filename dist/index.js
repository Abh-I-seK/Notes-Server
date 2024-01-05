"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const search_1 = __importDefault(require("./routes/search"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false
});
app.use(limiter);
app.use("/auth", auth_1.default);
app.use("/notes", notes_1.default);
app.use("/search", search_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ msg: "hello" });
});
exports.default = app;
