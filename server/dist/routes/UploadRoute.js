"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ResponseHelper_1 = require("./ResponseHelper");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../../public/upload'),
    filename: function (req, file, cb) {
        const filename = new Date().getTime() + path_1.default.extname(file.originalname);
        cb(null, filename);
    }
});
const allowExtname = ['.jpg', '.png', '.gif', '.giff', '.bmp'];
const upload = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (allowExtname.includes(path_1.default.extname(file.originalname))) {
            cb(null, true);
        }
        else {
            cb(new Error('文件不符合要求'));
        }
    }
}).single('myFile');
router.post('/', ((req, res) => {
    upload(req, res, function (err) {
        if (err) {
            ResponseHelper_1.ResponseHelper.sendError(err, res);
        }
        else {
            const url = `/upload/${req.file.filename}`;
            ResponseHelper_1.ResponseHelper.sendData(url, res);
        }
    });
}));
exports.default = router;
