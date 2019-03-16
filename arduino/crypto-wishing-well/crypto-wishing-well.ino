#include <FastLED.h>
#define NUM_LEDS 240
#define DATA_PIN 3
#define BRIGHTNESS 20
#include <SoftwareSerial.h>

CRGB leds[NUM_LEDS];

void setup() {
  // set the data rate for the SoftwareSerial port
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  resetStream();
//  Serial.begin(9600);
}

void loop() {
//  Serial.begin(9600);
//  Serial.println("Ready");
//  Serial.end();
//  uint8_t cmd_buffer[64];
  // Tell the other side to send data
//  Serial.println("OK");
  // Read a pre-determined amount of data
  //Serial.readBytes(cmd_buffer, 64);
//  uint64_t IMAGE = 0;
//  for (int i = 0; i < (sizeof(byte) * 8); i++) {
//    IMAGE = (IMAGE << 8) + (cmd_buffer[i] & 0xff);
//  }
  // do stuff with the data
  //int integer = int(cmd_buffer);
  //Serial.println(integer);
// if (letter == '1'){
    stream(1);
//  }
//  else if(letter == '0') {
//  }
      // same assumption

    // now do led stuff

  // rest of loop
  
  delay(100);
//  stream(5);
//  uint8_t cmd_buffer[64];
//  Serial.println("OK");
//  Serial.readBytes(cmd_buffer, 64);
  
}

void testStream() {
  int amounts[1];
  amounts[0] = 1;
  for (int i = 0; i < 1; i++) {
    stream(amounts[i]);
  }
}

void stream(int amount) {
  for (int index = 0; index < NUM_LEDS; index++) {
    for (int i = 0; i < amount; i++) {
      setColor(index+i, amount);
    }
    FastLED.show();
    delay(10);
    for (int i = 0; i < amount; i++) {
      leds[index+i] = CRGB::Black;
    }
  }
}

void resetStream(){
  for (int i = 0; i < 240; i++) {
    leds[i] = CRGB::Black;
}
}

void setColor(int dot, int color) {
  if (color == 1) {
    leds[dot] = CRGB(255,35,0);
  }
  if (color == 2) {
    leds[dot] = CRGB::Blue;
  }
  if (color == 3) {
    leds[dot] = CRGB::Green;
  }
  if (color == 4) {
    leds[dot] = CRGB::Red;
  }
  if (color == 5) {
    leds[dot] = CRGB::Purple;
  }
  else {
    leds[dot] = CRGB(255,35,0);
  }
}
