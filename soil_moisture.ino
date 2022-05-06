int sensorPin = A0;
int sensorValue;
int limit = 300;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  Serial.println("Soil Moisture Level: ");
  Serial.println(sensorValue);
  delay(1000);
}
