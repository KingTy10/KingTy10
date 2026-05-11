let sentiment;
let submitBtn;
let inputBox;
let sentimentResult;

function preload() {
  sentiment = ml5.sentiment("MovieReviews");
}

function setup() {
  noCanvas();

  inputBox = createInput("Today is the happiest day and is full of rainbows!");
  inputBox.attribute("size", "75");

  submitBtn = createButton("submit");
  sentimentResult = createP("Sentiment confidence:");

  submitBtn.mousePressed(getSentiment);
}

function getSentiment() {
  let text = inputBox.value();
  sentiment.predict(text, gotResult);
}

function gotResult(result) {
  let score = result.confidence;

  let emoji = "";
  let color = "";

  if (score > 0.7) {
    emoji = "😊 Amazing review!";
    color = "#00ffae";
  } else if (score < 0.4) {
    emoji = "😡 Negative review!";
    color = "#ff4d6d";
  } else {
    emoji = "😐 Mixed feelings!";
    color = "#ffd166";
  }

  sentimentResult.html(`${emoji} (${score.toFixed(3)})`);
  sentimentResult.style("color", color);
  sentimentResult.style("font-size", "24px");
}

function keyPressed() {
  if (keyCode === ENTER) {
    getSentiment();
  }
}