from pyetherscan import Client
from pyetherscan import Address

client = Client()
address = '0xb215cfebb90d91b1d2f499843800d3105b1366fc'
contract_address = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'

counter = 0
dai_balance = 0

from time import sleep


import serial


ser = serial.Serial("COM6", 9600) # Establish the connection on a specific port

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
    new_dai_balance = ethereum_address.token_balance(contract_address)
    new_dai_balance = new_dai_balance / 10**18
    print("Previous Dai Balance: ", dai_balance)
    print("New Dai Balance: ", new_dai_balance)
    new_dai = new_dai_balance - dai_balance
    print("Difference: ", new_dai)
    dai_balance = dai_balance + 1
    
    if new_dai > 0:
        print("WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        sleep(2) # may need 5s
        #number = 5
        #thisByteArray = number.to_bytes(64, byteorder = 'big')
        number = int(dai_balance)
        numberInByteArray = number.to_bytes(64, byteorder = 'big')
        #byte = chr(0x31)
        #print("writing...")
        #print(byte)
        #realbyte = byte.encode
        #print(realbyte)
        #ser.write(byte.encode()) # byte0<=i<=255
        ser.write(numberInByteArray)
        sleep(2)
#        print("reading line...")
#        print(ser.readline()) # Read the newest output from the Arduino
#        thisString = str(ser.readline())
    print('\n')

ser.close()
