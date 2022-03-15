import serial
import pyautogui
import os

def clearConsole():
    command = 'clear'
    if os.name in ('nt', 'dos'):  # If Machine is running on Windows, use cls
        command = 'cls'
    os.system(command)



port = input("Lutfen Arduinonuzun takılı oldugu COM portunun numarasını giriniz (Ornek: 1, 2, 3): ")
print("Ogrenmek Icın: Aygıt yoneticisi>Baglanti Noktalari(COM ve LPT)>Arduinonun baglı oldugu COM{x} portunun numarası\n")
print("Eger gozukmuyorsa lutfen suruculeri yukleyin. Gelecek guncellemelerde otomatik bir yukleme sistemi icin calisiyoruz.")

ser = serial.Serial(f'COM{port}', 9800, timeout=1)

clearConsole()

def handler():
    try:
        line = ser.read().decode("utf-8") 
        print(line)
        if line == "1":

            pyautogui.press("1")
            ser.close()
            return

        if line == "2":
            pyautogui.press("2")
            ser.close()
            return

        if line == "3":

            pyautogui.press("3")
            ser.close()
            return
    except:
        handler()

while True:
    if ser.is_open:
        handler()
    else:
        ser.open()
        