
import fs from 'fs';
import readline from 'readline';
import path from 'path';

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

export function getToken(req, res) {

}

export function callBack(req, res) {
    
}
export async function handleGetTweet(req, res) {
    const fileContent = await readTweetFile();
    fileContent.forEach(element => {
        console.log(element.tweet)
        if (element?.tweet && element?.tweet != undefined && element?.tweet != '') {
            handlePostTweet(element.tweet);
        }
    });
    res.status(200).json({ message: 'Tweet posted successfully', fileContent });
}

function handlePostTweet(req, res) {
    try {

        res.status(200).json({ message: 'Tweet posted successfully', tweets });
    } catch (error) {
        console.error('Error in handlePostTweet:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Helper functions
async function readTweetFile() {
    return new Promise((resolve, reject) => {
        try {
            const filePath = path.join(new URL('.', import.meta.url).pathname, '..', 'data', '../tweets.txt');
            let content = [];

            const fileStream = fs.createReadStream(filePath);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            rl.on('line', async (line) => {
                if (line && line.trim() && line.trim() != '\n') {
                    const parsedTweet = await parseTweetContent(line);
                    if (parsedTweet) {
                        content.push(parsedTweet);
                    }
                } else {
                    console.log('no content');
                }
            });

            rl.on('close', () => {
                resolve(content);
            });

            rl.on('error', (e) => {
                console.error(e)
                reject(e?.message)
            });
        } catch (error) {
            reject(error?.message)
        }
    }).catch((reason) => console.error(reason));
}


async function parseTweetContent(text) {
    try {
        return await new Promise((resolve, reject) => {
            if (!text || text === '' || text === undefined) reject('text is empty');

            const parts = [text.slice(0, text.indexOf(':')), text.slice(text.indexOf(':') + 1)];
            if (parts.length !== 2) {
                reject('Invalid tweet format:' + text);
            }

            const username = parts[0].trim().match(/\*\*(.*?)\*\*/)[1];
            const tweet = parts[1].trim().replace(/^"|"$/g, '').replace(/;/g, ',');

            resolve({ username, tweet });
        }).catch((reason) => console.error(reason));
    } catch (reason) {
        return console.error(reason);
    }
}