#define green 6
#define red 7
#define blue 8

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9800);
  pinMode(green, INPUT_PULLUP);
  pinMode(red, INPUT_PULLUP);
  pinMode(blue, INPUT_PULLUP);

}

void loop() {
  // put your main code here, to run repeatedly:


    if(digitalRead(green) == 1 )
    {
    Serial.print('1');
    }
    
    if(digitalRead(red) == 1 )
    {
    Serial.print('2');
    }
    
    if(digitalRead(blue) == 1 )
    {
    Serial.print('3');
    }

    delay(3);
}
