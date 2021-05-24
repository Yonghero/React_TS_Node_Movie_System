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
exports.MovieService = void 0;
const Movie_1 = require("../entities/Movie");
const movieSchema_1 = __importDefault(require("../db/movieSchema"));
const SearchCondition_1 = require("../entities/SearchCondition");
class MovieService {
    static addMovie(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieC = Movie_1.Movie.transform(movie);
            const errors = yield movieC.validatorThis();
            if (errors.length > 0) {
                return errors;
            }
            return yield movieSchema_1.default.create(movieC);
        });
    }
    static editMovie(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieC = Movie_1.Movie.transform(movie);
            const errors = yield movieC.validatorThis(true);
            yield movieSchema_1.default.updateOne({ _id: id }, movie);
            return errors;
        });
    }
    static delMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return movieSchema_1.default.deleteOne({ _id: id });
        });
    }
    static findMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return movieSchema_1.default.findById(id);
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const conEntity = SearchCondition_1.SearchCondition.transform(condition);
            const errors = yield conEntity.validatorThis();
            if (errors.length > 0) {
                return {
                    count: 0,
                    data: null,
                    errors
                };
            }
            const movies = yield movieSchema_1.default.find({ name: { $regex: new RegExp(conEntity.key) } })
                .skip((conEntity.page - 1) * conEntity.limit)
                .limit(conEntity.limit);
            const count = yield movieSchema_1.default.find({ name: { $regex: new RegExp(conEntity.key) } })
                .countDocuments();
            return {
                count,
                data: movies,
                errors: []
            };
        });
    }
}
exports.MovieService = MovieService;
