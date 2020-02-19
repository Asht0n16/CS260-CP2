// YAY!
function isNumeric(input) {
  return (input - 0) == input && (''+input).trim().length > 0;
}

function getJokes(e) {
  e.preventDefault();

  // get values
  let prog = document.getElementById('programming').checked;
  let misc = document.getElementById('miscellaneous').checked;
  let numJokes = document.getElementById('jokeNumber').value;

  // check to see if numJokes is really a number
  if (!isNumeric(numJokes)) {
    numJokes = 1;     // Make it equal to one
  }

  // setup URL
  let url = "https://sv443.net/jokeapi/v2/joke/";
  if (prog) {
    url += "Programming";
  }
  else if (misc) {
    url += "Miscellaneous";
  }
  url += "?blacklistFlags=nsfw,religious,racist,sexist";

  // call API
  document.getElementById('jokes').innerHTML = ""
  for(let i=0; i<numJokes && i<15; i++){
    //debugger;
    fetch(url)
      .then((response) => {
        if (response.status != 200) {
          return {
            text: "Error calling the API: " + response.statusText
          }
        }
        return response.json();
      }).then((json) => {
        let joke = "<p>";
        if(json.type == "twopart") {
          joke += json.setup + '<br>' + json.delivery;
        }
        else {
          joke += json.joke;
        }
        joke += "</p>"
        document.getElementById('jokes').innerHTML += joke;
      });
    }
}

document.getElementById("button").addEventListener('click', getJokes);
