from pyetherscan import Client
from pyetherscan import Address

client = Client()
address = '0xb215cfebb90d91b1d2f499843800d3105b1366fc'
contract_address = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'

from time import sleep
import serial
ser = serial.Serial("COM6", 9600) # Establish the connection on a specific port
counter = 0
while True:
    counter += 1
    print("Reading # ", counter)

    address_balance = client.get_single_balance(address)
    print ("Status Code: ", address_balance.response_status_code)
    print ("Satus: ", address_balance.message)
    balance = address_balance.balance
    balance = balance / 10**18
    print("ETH Balance: ", balance)
    ethereum_address = Address(address)
    dai_balance = ethereum_address.token_balance(contract_address)
    dai_balance = dai_balance / 10**18
    print("Dai Balance: ", dai_balance)
    signal = 0

    if balance >= 1:
        signal = 1
    if balance >= 2:
        signal = 2
    if balance >= 3:
        signal = 3
    if balance >= 4:
        signal = 4
    if balance >= 5:
        signal = 5

    print("Sent Signal: ", signal)
    ser.write(str(signal).encode()) # Convert the decimal number to ASCII then send it to the Arduino
    print("reading line...")
    print(ser.readline()) # Read the newest output from the Arduino
    print(" ")
    sleep(1) # Delay for one tenth of a second
