#!/usr/bin/env node
const fs = require('fs').promises;

class CodingChallengeCreator {
    constructor(year, day) {
        this.year = year;
        this.day = day;
        this.filesToCopy = ['README.md', 'input.txt', 'challenge.js'];
        this.folderName = null;
    }

    async writeReadmeFile() {
        try {
            const [readmeFile] = this.filesToCopy;
            const reworkedDay = this.day.padStart(2, '0');
            const replacements = [this.year, reworkedDay];

            let data = await fs.readFile(`./${this.folderName}/${readmeFile}`, 'utf8');
            data = data.replace(/%(\d+)/g, (_, n) => replacements[+n - 1]);

            await fs.writeFile(`./${this.folderName}/${readmeFile}`, data, 'utf8');
        } catch (err) {
            console.error('Error Found:', err);
        }
    }

    async copyTemplateFiles() {
        try {
            await fs.mkdir(this.folderName, { recursive: true });

            for (const file of this.filesToCopy) {
                await fs.copyFile(`./template/${file}`, `${this.folderName}/${file}`);
                console.log(`${this.folderName}/${file} successfully created`);
            }

            await this.writeReadmeFile(this.folderName);
        } catch (err) {
            console.error('Error Found:', err);
        }
    }

    async createNewCodingChallenge() {
        if (parseInt(this.year) && parseInt(this.day)) {
            this.folderName = `./${this.year}/${this.day}`;

            try {
                if (!(await fs.stat(this.folderName).catch(() => false))) {
                    await this.copyTemplateFiles(this.folderName);
                    console.log(`\x1b[42m ${this.day}/${this.year}'s challenge successfully created \x1b[0m`)
                } else {
                    console.log('\x1b[43m This folder already exists! \x1b[0m');
                }
            } catch (err) {
                console.error('Error Found:', err);
            }
        }
    }
}

const [, , ...args] = process.argv;
const [year, day] = args;

const creator = new CodingChallengeCreator(year, day);
creator.createNewCodingChallenge();