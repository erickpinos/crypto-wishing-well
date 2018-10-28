#include <FastLED.h>
#define NUM_LEDS 240
#define DATA_PIN 6
#define BRIGHTNESS 20

CRGB leds[NUM_LEDS];

int inPin = 2;
int ledPin =  13;
int val = 0;

void setup() {
//  Serial.begin(9600);
//  Serial.println("Ready");
//  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  pinMode(inPin, INPUT);
  pinMode(ledPin, OUTPUT);
}
int buttonClick = 0;

void loop() {
  val = digitalRead(inPin);
  if (val == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }

//  resetStrip();
//  Serial.println("resetStrip");

  if (buttonClick == 1) {
//     stream(5);
  }
//    char inByte = ' ';
//  if (Serial.available()) {
//    inByte = Serial.read();
//    Serial.println(inByte);
//    amounts[0] = inByte;
//  }
    
//  int amounts[1];
//  amounts[0] = 1;
//  for (int i = 0; i < 1; i++) {
//    stream(amounts[i]);
//  }
}
int count = 0;

void resetStrip() {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Black;
  }
  FastLED.show();
}

void stream(int amount) {
  if (buttonClick == 1) {
  for (int index = 0; index < 200; index++) {
    for (int i = 0; i < amount; i++) {
      setColor(index+i, amount);
    }
    FastLED.show();
    delay(10);
    for (int i = 0; i < amount; i++) {
      leds[index+i] = CRGB::Black;
    }
    FastLED.show();
  }
  }
  buttonClick = 0;
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
