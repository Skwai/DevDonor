"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const storage_1 = require("@google-cloud/storage");
const process_promises_1 = require("process-promises");
const path = require("path");
const os = require("os");
const fs = require("fs");
const SIZES = [64, 128, 256, 512]; // Resize target width in pixels
exports.default = functions.storage.object().onChange((event) => __awaiter(this, void 0, void 0, function* () {
    const object = event.data;
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    const resourceState = object.resourceState;
    const metageneration = object.metageneration;
    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return;
    }
    if (resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }
    if (resourceState === 'exists' && metageneration > 1) {
        console.log('This is a metadata change event.');
        return;
    }
    const fileName = path.basename(filePath);
    const bucket = new storage_1.Bucket(new storage_1.Storage(), fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
        contentType: contentType
    };
    yield bucket.file(filePath).download({ destination: tempFilePath });
    const promises = SIZES.map((size) => __awaiter(this, void 0, void 0, function* () {
        const newFileName = `${fileName}-${size}`;
        const newFileTemp = path.join(os.tmpdir(), newFileName);
        const newFilePath = `thumbnails/${newFileName}`;
        try {
            yield process_promises_1.spawn('convert', [tempFilePath, '-thumbnail', `${size}x${size}>`, newFileTemp]);
            yield bucket.upload(newFileTemp, {
                destination: newFilePath,
                metadata
            });
            yield fs.unlinkSync(tempFilePath);
            console.log(`Thumbnail created at ${newFilePath}`);
        }
        catch (err) {
            console.error(err);
        }
    }));
    yield Promise.all(promises);
    console.log('Thumbnail creation completed');
}));
//# sourceMappingURL=index.js.map