import os

os.system("python3 start.py")
os.system("python3 game.py")

with open("results.txt", 'r') as f:
    res = f.readline().strip(""); 
os.system("python3 "+res+".py")

