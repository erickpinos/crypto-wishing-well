#include <FastLED.h>
#define NUM_LEDS 240
#define DATA_PIN 5 // Data pin that led data will be written out over
//#define CLOCK_PIN 1   // Clock pin only needed for SPI based chipsets when not using hardware SPI
#define BRIGHTNESS 20
CRGB leds[NUM_LEDS];
  int click = 0;
///int amount;

void setup() {
  // sanity check delay - allows reprogramming if accidently blowing power w/leds

    delay(2000);
    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
    Serial.begin(9600); // set the baud rate
    Serial.println("Ready"); // print "Ready" once
}


void loop() {
 char inByte = ' ';
  if(Serial.available()){ // only send data back if data has been sent
    inByte = Serial.read(); // read the incoming data
    Serial.println(inByte); // send the data back in a new line so that it is not all one long line

 int amount = inByte;
  if (amount > "78"){
    amount = "78";
  }
  delay(100); // delay for 1/10 of a second


  if (click == 0){
  for (int i = 0; i <= '240' + amount; i++) {
  leds[i] = CRGB(255,35,0); 
  FastLED.show();
  delay(0.5);  
  int j = i - amount;
  if (j < 0) {
    j += '240'+amount;
  }
  leds[j] = CRGB(0,0,0);
  click = 0;
  }}}}


  
  //for (int i = 0; i <= 240; i++){
  //leds[i] = CRGB(0,0,0);
  //FastLED.show();
  //delay(60);
  //}
   //leds[0] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[0] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[1] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[1] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[2] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[2] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[3] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[3] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[4] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[4] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[5] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[5] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);
   //leds[6] = CRGB(255,35,0);
   //FastLED.show();
   //delay(500);
   //leds[6] = CRGB(0,0,0);
   //FastLED.show();
   //delay(100);

  
