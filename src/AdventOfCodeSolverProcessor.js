const fs = require('fs');

/**
 * A class for processing Advent of Code solver logic.
 */
class AdventOfCodeSolverProcessor {
    constructor() {
        this.inputContent = this.readFile('./input.txt')
    }

    /**
     * Reads the content of a file and returns it as a string.
     * @param {string} filePath - The path to the file to be read.
     * @returns {string} - The content of the file.
     */
    readFile(filePath) {
        try {
            return this.inputContent = fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error(`Error reading the file ${filePath} : ${error.message}`);
            return null;
        }
    }

    /**
     * Logs the approximate memory usage of the script to the console.
     */
    getMemoryUsage() {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    }
}

module.exports = AdventOfCodeSolverProcessor;