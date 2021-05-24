"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const MovieRoute_1 = __importDefault(require("./routes/MovieRoute"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect("mongodb://localhost:27017/moviedb", {
    useNewUrlParser: true
}).then(() => console.log("连接数据库成功"));
const app = express_1.default();
app.listen(2000);
app.use('/upload', express_1.default.static(path_1.default.resolve(__dirname, '../public/upload')));
app.use(express_1.default.json());
app.use('/api/movie', MovieRoute_1.default);
app.use('/api/upload', UploadRoute_1.default);
