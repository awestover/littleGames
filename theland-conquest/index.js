// backend example, integrate with theland later
let express = require('express'); // needs this library
let app = express();
let port = process.env.PORT || 3000;  // what port to open it on must have the o
// chosen by server if you want it to be heroku compatible, also does need the d
let server = require('http').createServer(app).listen(port);
let socket = require('socket.io');
let io = socket(server);
app.use(express.static('public'));

const { Client } = require('pg');

console.log("RUNNING on localhost:"+port);

// query the database
function queryDb(qu, params, callbackFunction, callbackParams)
{
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    client.connect();
    console.log("Querying " + qu);
    console.log("With params " + params);

    let dataResults = [];
    client.query(qu, params, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        dataResults.push(row);
      }
      client.end();
      console.log(dataResults);
      if(callbackFunction)
      {
        callbackFunction(dataResults, callbackParams);
      }
    });
  } catch (e) {
    console.log("ERROR in database stuff");
    if(callbackFunction)
    {
      dataResults = [];
      callbackFunction(dataResults, callbackParams); 
    }
  }
}

app.post('/conquest-data', function(req, resp) {
  resp.send({"asdf":"adf"});
  //let unm = req.body.unm;
  //let pwd = req.body.pwd;
  //let params = {"resp": resp, "pwd_hash": stupidHash(pwd), "unm": unm};
  //queryDb("SELECT * FROM Users WHERE name=$1", [unm], handleConqestDataRequest, params);
});

function handleConqestDataRequest(results, params)
{
  let resp = params["resp"];
  let pwd_hash = params["pwd_hash"];
  let unm = params["unm"];

  if (results.length == 0)
  {
    resp.redirect("conquest-login.html?fail=unm-doesnt-exist")
  }
  else
  {
    let pwd_real = results[0]["pwd_hash"]
    if (pwd_real == pwd_hash)
    {
      resp.redirect("conquest.html?success=you_are_good");
    }
    else
    {
      resp.redirect("conquest-login?fail=wrong-password")
    }
  }

}

// this is a really bad hash function, but I bet it can deter most people (only really worrie
function stupidHash(pwd)
{
  let o = 1;
  for(let i = 0; i < pwd.length; i++)
  {
    o *= pwd.charCodeAt(i);
    o = o % 7907;
  }
  return o;
}

