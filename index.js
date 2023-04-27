// Import the required modules
const express = require('express');

// Import the Database
const conn = require('./db');

// Create an instance of the Express application
const app = express();

conn.connect((err) => {
    if (err){
        console.log("Error in database");
        console.log(err);
        return ;
    }
    console.log('Connected to database');
});

function stoi(a)
{
    let res = 0;
    for(let i=0; i<a.length; ++i)
    {
        res = res*10 + a.charCodeAt(i)-48;
    }

    return res;
}

app.get('/v1/get_player_average', async (req, res) => {
    conn.query('SELECT * FROM abcd', (error, result, fields) => {
        if (error) {
            console.log(error);
            res.send("Try Again!");
        }
        let scoreArr = [];
    
        for(var i=0; i<result.length; ++i)
        {
            let name = result[i].player_name;
            let count = 0;
            let sum = 0;
            
            delete result[i].player_name;
            var keys = Object.keys( result[i] );
            keys.sort( function ( a, b ) { 

                let x = a.substring(5);
                let y = b.substring(5);
                return stoi(y)-stoi(x); 
            });

            for(var j = 0; j<5 && j<keys.length; ++j)
            {
                sum += result[i][keys[j]];
                count++;
            }
        
            averegescore = sum/count;
            scoreArr.push({name,averegescore});
            
        }

        return res.json(scoreArr);
    });
    
});



// Start the server
app.listen(3000, (req,res) => {
  console.log('Server started on port 3000');
});




// Link : https://subtlerrr-assignment.onrender.com/v1/get_player_average;