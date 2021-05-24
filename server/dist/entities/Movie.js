"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const BaseEntity_1 = require("./BaseEntity");
class Movie extends BaseEntity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.isComing = false;
        this.isHot = false;
        this.isClassic = false;
    }
    static transform(obj) {
        return super.baseTransform(Movie, obj);
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: '电影名称不能为空' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '电影类型不能为空' }),
    class_validator_1.ArrayMinSize(1, { message: '电影类型至少包括一项' }),
    class_validator_1.IsArray({ message: '电影类型必须为数组' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "types", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '上映地区不为空' }),
    class_validator_1.ArrayMinSize(1, { message: '上映地区至少有一个' }),
    class_transformer_1.Type(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "area", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '电影上映时长' }),
    class_validator_1.IsInt({ message: '时长必须是整数' }),
    class_validator_1.Min(1, { message: '时长最少一分钟' }),
    class_validator_1.Max(999999, { message: '电影时长过长' }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], Movie.prototype, "timeLong", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: '是否即将上映' }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isComing", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "是否热映不可以为空" }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isHot", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "是否是经典影片不可以为空" }),
    class_transformer_1.Type(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isClassic", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "poster", void 0);
__decorate([
    class_transformer_1.Type(() => String),
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
exports.Movie = Movie;
