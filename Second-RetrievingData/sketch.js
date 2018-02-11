var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup() {
  canvas = createCanvas(100, 100);
  score = 0;
  createP('Click the button to get points.')
  button = createButton('click');
  button.mousePressed(increaseScore);
  initialInput = createInput('initials');
  submitButton = createButton("Submit");
  submitButton.mousePressed(submitScore);

  var config = {
    apiKey: "AIzaSyD3trNJWoVdOxUuNJ8i5y2YITdS3ESKR2M",
    authDomain: "my-first-project-b78e2.firebaseapp.com",
    databaseURL: "https://my-first-project-b78e2.firebaseio.com",
    projectId: "my-first-project-b78e2",
    storageBucket: "my-first-project-b78e2.appspot.com",
    messagingSenderId: "920531369631"
  };
  firebase.initializeApp(config);
  database = firebase.database();

  var ref = database.ref('scores');
  ref.on('value',gotData,errData);    //defining events through ref
  }

  function gotData(data)
  {
    
    console.log(data.val());
    var scores = data.val();
    var keys = Object.keys(scores);
    console.log(keys);    //above three lines are to make objects of database an element of the array
    for(var i=0;i<keys.length;i++)
    {
      var k = keys[i];
      var initials = scores[k].initials;
      var score = scores[k].score;


      var li = createElement('li',initials+': '+score);
      li.clear('scorelisting');   //to clear up the previous data in the list after updation of list
                                  //and show the list with updataed elements instead of duplicating them again
      li.parent('scorelist');
      console.log(initials,score);
    }
  }

  function errData(err)
  {
    console.log('Error');
    console.log(err);
  }

function increaseScore() {
  score++;
}

function submitScore()
{
  var data = 
  {
    initials: initialInput.value(),
    score: score
  }
  console.log(data);
  var ref = database.ref('scores');
  ref.push(data);
}

function draw() {
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(score, width / 2, height / 2);
}
