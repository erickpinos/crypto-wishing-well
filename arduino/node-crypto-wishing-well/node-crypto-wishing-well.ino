#include <FastLED.h>
#define NUM_LEDS 240
#define BRIGHTNESS 20
#include <SoftwareSerial.h>

#define DATA_PIN 2

SoftwareSerial mySerial(10, 11); // RX, TX
CRGB leds[NUM_LEDS];

void setup() {

  // set the data rate for the SoftwareSerial port
//  Serial.begin(9600);
//  Serial.println("Hello, world?");
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
    FastLED.setBrightness( BRIGHTNESS );
}

void loop() {
//  Serial.begin(9600);
//  Serial.println("Ready");
//  Serial.end();
//  delay(100);
mySerial.println("Hello");
//  FastLED.show();
  stream(1);
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
