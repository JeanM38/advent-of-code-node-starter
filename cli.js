#!/usr/bin/env node
const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const fs = require('fs').promises;
const { session } = require('./config.js');

class CodingChallengeCreator {
    constructor(year, day) {
        this.year = year;
        this.day = day;
        this.folderName = `./${this.year}/${this.day}`;
    }

    /**
     * @param {string} filePath 
     * @param {string} content 
     */
    async writeToFile(filePath, content) {
        try {
            await fs.writeFile(filePath, content, 'utf8');
            console.log(`${filePath} successfully created`);
        } catch (err) {
            console.error('Error writing file:', err);
        }
    }

    async createNewCodingChallenge() {
        if (!session) {
            console.error('\x1b[43m The session cookie may not be set. Please check the configuration file. \x1b[0m');
            process.exit(1);
        }

        if (parseInt(this.year) && parseInt(this.day)) {
            try {
                const adventData = await this.fetchAdventOfCodeData();
                if (adventData) {
                    await this.createFolder();
                    await this.writeToFile(`${this.folderName}/README.md`, adventData.markdownContent);
                    await this.writeToFile(`${this.folderName}/input.txt`, adventData.input);
                    await this.copyChallengeFile();
                    console.log(`\x1b[42m ${this.day}/${this.year}'s challenge successfully created \x1b[0m`);
                } else {
                    console.log('\x1b[43m Unable to fetch Advent of Code data. Challenge creation aborted. \x1b[0m');
                }
            } catch (err) {
                console.error('Error Found:', err);
            }
        }
    }

    async createFolder() {
        try {
            await fs.mkdir(this.folderName, { recursive: true });
            console.log(`${this.folderName} successfully created`);
        } catch (err) {
            console.error('Error creating folder:', err);
        }
    }

    async fetchAdventOfCodeData() {
        try {
            const pageResponse = await axios.get(`https://adventofcode.com/${this.year}/day/${this.day}`, {
                headers: {
                    Cookie: `session=${session}`,
                },
            });

            const $ = cheerio.load(pageResponse.data);
            const articleContent = $('article').html();

            const inputResponse = await axios.get(`https://adventofcode.com/${this.year}/day/${this.day}/input`, {
                headers: {
                    Cookie: `session=${session}`,
                },
            });

            const input = inputResponse.data;
            const turndownService = new TurndownService();
            const markdownContent = turndownService.turndown(articleContent);

            return { markdownContent, input };
        } catch (error) {
            console.error('Error retrieving data:', error.message);
            return null;
        }
    }

    async copyChallengeFile() {
        try {
            const challengeFileContent = await fs.readFile('./template/challenge.js', 'utf8');
            await this.writeToFile(`${this.folderName}/challenge.js`, challengeFileContent);
        } catch (err) {
            console.error('Error copying challenge file:', err);
        }
    }
}

const [, , ...args] = process.argv;
const [year, day] = args;

const creator = new CodingChallengeCreator(year, day);
creator.createNewCodingChallenge();
