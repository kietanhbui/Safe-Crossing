var serial,serial2,outmessage,outmessage2, textout;
var latestData = "waiting for data";  

function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.list();
  serial.open("COM4");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
}

function serverConnected() {
  println("Connected to Server");
}

function gotList(thelist) {
  println("List of Serial Ports:");
  for (var i = 0; i < thelist.length; i++) {
    println(i + " " + thelist[i]);
  }
}

function gotOpen() {
  println("Serial Port is Open");
}

function gotError(theerror) {
  println(theerror);
}

function gotData() {
  var currentString = serial.readLine();  
  latestData = currentString;    
  console.log(currentString);  
  if (latestData == "T"){
    document.getElementById("warning").style.display="block";
    document.getElementById("inactive").style.display="none";
    document.getElementById("active").style.display="none";    
    document.getElementById("play").play();
  }
//  else if(latestData =="T" && outmessage2=="I"){
//    document.getElementById("phoneUI").style.display="none";
//    serial.write(outmessage2);
//  }
  else if (latestData == "F"){
    document.getElementById("play").pause();
    document.getElementById("warning").style.display="none";
    document.getElementById("active").style.display="block";
    
  }
}

  function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  //textSize(10);
  //text(textout,50,50);
}

function stopButton(){
  outmessage = 'R';
  serial.write(outmessage);
  console.log(outmessage);
  textout = "The Red Light is On. Stop";
}

function walkButton(){
  outmessage = 'G';
    serial.write(outmessage);
    console.log(outmessage);
  textout= "The Green Light is On. You can walk"
}

function activePhone(){
  outmessage2 = 'A';
  serial.write(outmessage2);
  console.log(outmessage2);
  textout = "Your phone is active";
  document.getElementById("active").style.display="block";
  
  document.getElementById("inactive").style.display="none";
  
    document.getElementById("warning").style.display="none";
}

function idlePhone(){
  outmessage2 = 'I';
  serial.write(outmessage2);
  console.log(outmessage2);
  textout = "Your phone is idle";
    document.getElementById("inactive").style.display="block";
  
    document.getElementById("active").style.display="none";
    document.getElementById("warning").style.display="none";
}

