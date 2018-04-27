const int trigPin = 7;
const int echoPin = 8;

int vibrate = 6;
int led_walk = 10;
int led_stop = 11;

//int greenPin = 12;
//int bluePin = 13;

long duration, cm, cm2, cm3, data, lightstatus, phonestatus;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(vibrate, OUTPUT);
  pinMode(led_walk, OUTPUT);
  pinMode(led_stop, OUTPUT); 
   
//  pinMode(greenPin, OUTPUT);
//  pinMode(bluePin, OUTPUT);
}

void loop() {
//
//  digitalWrite(vibrate, HIGH);
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  cm = (duration / 2) / 29.1;

  if (Serial.available() > 0){
    data = Serial.read();
    if (data == 'R' || data == 'G'){
    lightstatus = data;}
    if (data == 'A' || data =='I'){
    phonestatus = data;}
  }
  
  if (lightstatus == 'R'){
//    setColor(250,0,0);
    digitalWrite(led_stop, HIGH);
    digitalWrite(led_walk, LOW);
    if (cm <= 60 && phonestatus == 'A'){
      Serial.println('T');   
      digitalWrite(vibrate, LOW);}
    else if (cm <= 60 && phonestatus == 'I'){
      digitalWrite(vibrate, HIGH);
      Serial.println('F');
    }     
    else{
      Serial.println('F');  
      
      digitalWrite(vibrate, LOW);   
    }
  }

    
  else if (lightstatus == 'G') {
    Serial.println('F');
    digitalWrite(led_walk, HIGH);
    digitalWrite(led_stop, LOW);
    
      digitalWrite(vibrate, LOW);
//    setColor(0,0,0);
  } 
}
    
//void setColor(int red, int green, int blue){
//  #ifdef COMMON_ANODE
//    red = 255 - red;
//    green = 255 - green;
//    blue = 255 - blue;
//  #endif
//  analogWrite(led_stop, red);
//  analogWrite(greenPin, green);
//  analogWrite(bluePin, blue);
//}
