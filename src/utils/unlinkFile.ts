import fs from 'fs';
import path from 'path';

const unlinkFile = (file: string) => {
    const pathName = new URL(file).pathname
    const filePath = path.join('uploads', pathName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

export default unlinkFile;