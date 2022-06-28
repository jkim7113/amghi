const https = require('https');
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PW,
    database: 'amghi',
    charset: 'utf8mb4',
    dateStrings: "date"
});

app.use(cors());
app.use(express.static('../public'));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// const apiKey = process.env.API_KEY;

app.get('/words',(req, res) => {
    db.query(`SELECT * FROM words`,(err, words) => {
       if(err) res.status(500).json({ msg: 'failed' });
       res.status(200).json({ words });
    });
});

app.get('/words/:word',(req, res) => {
    const word = req.params.word;
    
});

app.post('/words',(req, res) => {
    const word = req.body.word.replace(/(\s*)/g, "");
    const pof = req.body.pof;
    const definitions = req.body.definitions.filter(def => def.replace(/(\s*)/g, "") !== '');
    const examples = req.body.examples.filter(def => def.replace(/(\s*)/g, "") !== '');

    if(word !== '' && definitions.length !== 0 && examples.length !== 0){
        db.query(`INSERT INTO words (word, pof, defs, examples, author, date) VALUES (?,?,?,?,?,NOW())`,[word,pof,definitions.join('`'),examples.join('`'),1],(err, result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({ msg : 'failed' });
            } 
            res.status(200).json({ msg: 'succeed' });
        });
    } else {
        res.status(500).json({ msg : 'failed' });
    }
});

app.get('/search/:keyword',(req, res) => {
    const keyword = req.params.keyword.replace(" ","%20");

    // const apiOptions = {
    //     host: 'www.merriam-webster.com',
    //     path: `/lapi/v1/mwol-search/autocomplete?search=${keyword}`,
    //     method: "GET",
    // };

    // https.get(apiOptions, (response) => {
    //     let body = '';
    //     response.on('data', (data) => {
    //         body += data;
    //     });
    //     response.on('end', () => {
    //         const parsedJSON = JSON.parse(body);
    //         // let data = parsedJSON.docs.map(keyword => (
                
    //         //         keyword.ref === 'owl-combined' ?
    //         //         {
    //         //             word: keyword.word,
    //         //             id: String(keyword.word).replace(" ","-"),
    //         //         } 
    //         //         : ''
                
    //         // ));
            
    //         // data = data.filter((item) => {
    //         //     return item !== '';
    //         // });
            
    //         res.json({ results:parsedJSON });
    //     });
    // });
    
});

app.get('*',(req, res) => {
    res.status(404).json({ error:'404 Not Found' });
});

app.listen(4000);