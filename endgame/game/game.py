from User import *
import pygame
from pygame.locals import *
import pygame.display
import os
from os.path import join
import numpy as np
import sys
from Gametree import *
import json
from Bullet import *

from end import *
from pdb import set_trace as tr

images = {}
for file in os.listdir("img"):
    if ".png" in file or ".jpg" in file:
        rFile = file.replace(".jpg", "").replace(".png", "")
        images[rFile] = pygame.image.load(join("img", file))

screen_color = (0,10,100)
pygame.init()
pygame.mouse.set_visible(False)
#  screen_dims = (1000, 800)
#  window = pygame.display.set_mode(screen_dims, RESIZABLE)
window = pygame.display.set_mode((0, 0), FULLSCREEN)
screen_dims = window.get_size()

with open("start.json", 'r') as f:
    datastore=json.load(f)
userType=datastore["species"]
user = User(images, window, userType, "user")
user.initCreatures(screen_dims[1]*0.8)
user.randomCreatureVels()
enemy = User(images, window, "robot front", "enemy")
enemy.initCreatures(screen_dims[1]*0.1)
enemy.randomCreatureVels()

cursor_red = pygame.image.load("img/cursor_red.png")
cursor_blue = pygame.image.load("img/cursor_blue.png")
cursor = cursor_red

def circle(pos):
    window.blit(cursor, pos)

def get_pos(fingerPos):
    #  tPos =  pygame.mouse.get_pos()
    tPos = fingerPos
    return [tPos[0]-20, tPos[1]-20]

def handleKeys(keys):
    nAcc = np.array([0, 0])
    if (keys[pygame.K_q]):
        end()
    if (keys[pygame.K_DOWN]):
        nAcc[1] = 1
    elif (keys[pygame.K_UP]):
        nAcc[1] = -1
    if (keys[pygame.K_LEFT]):
        nAcc[0] = -1
    elif (keys[pygame.K_RIGHT]):
        nAcc[0] = 1
    return nAcc

gametree=Gametree()
running = True
MOVEMENT_MODE = False
SELECTION_MODE = False
ATTACK_MODE = False
speed_limit_px = 300
troops = []

quarter_crosshairs = pygame.image.load("img/quarter.png")
quarter_crosshairs = pygame.transform.scale(quarter_crosshairs, (int(0.6*screen_dims[1]), int(0.6*screen_dims[1])))

InitialPoint = (-2, -2)

with open("size.json", 'r') as f:
    size = json.load(f)
rsize = [int(size["wrec"]),int(size["hrec"])]

def scale(pos, size1, size2):
    return [pos[0]*size2[0]/size1[0], pos[1]*size2[1]/size1[1]]

while running:
    nVel = handleKeys(pygame.key.get_pressed())

    if user.dead():
        with open("results.txt", 'w') as f:
            f.write("lost");
        running = False
        end()
    elif enemy.dead():
        with open("results.txt", 'w') as f:
            f.write("won");
        running = False
        end()

    try:
        with open("fingers.json", 'r') as f:
            datastore=json.load(f)
            datastore = scale([int(datastore["fingersX"]), int(datastore["fingersY"])], rsize, screen_dims)

    except ValueError:
        continue

    fingerPos = tuple(datastore)

    # handle every event since the last frame.
    for event in pygame.event.get():
        if event.type == pygame.KEYUP:
            if (event.key == pygame.K_SPACE and not SELECTION_MODE):
                MOVEMENT_MODE = True
                #  InitialPoint = pygame.mouse.get_pos()
                InitialPoint = fingerPos
            elif (event.key == pygame.K_LCTRL and not MOVEMENT_MODE):
                SELECTION_MODE = True
                #  InitialPoint = pygame.mouse.get_pos()
                InitialPoint = fingerPos
            elif (event.key == pygame.K_LSHIFT):
                ATTACK_MODE = True
                #  InitialPoint = pygame.mouse.get_pos()
            #  elif (event.key == pygame.K_CAPSLOCK):
            elif (event.key == pygame.K_ESCAPE):
                MOVEMENT_MODE = False
                SELECTION_MODE = False
        if event.type == pygame.QUIT:
            running = False
            end()

    window.fill(screen_color)

    gametree.clear()
    gametree.insertUser(user)
    gametree.insertUser(enemy)

    pos = get_pos(fingerPos)
    circle(pos)

    collisions = gametree.getCollisions()
    if len(collisions)>0:
        for collide in collisions:
            #  gametree.values[collide[0]].handleCollide(gametree.values[collide[1]])
            c0 = gametree.values[collide[0]]
            c1 = gametree.values[collide[1]]
            if (type(c0) == Bullet and type(c1) == Creature and c0.master!=c1.master): 
                c1.health-=0.1
                print("hi")
            elif (type(c1) == Bullet and type(c0) == Creature and c1.master!=c0.master): 
                c0.health-=0.1
                print("hi")
            elif type(c0) == Creature and type(c1) == Creature: 
                c0.handleCollide(c1)

    #  NewPoint = pygame.mouse.get_pos()
    NewPoint = get_pos(fingerPos)
    if SELECTION_MODE:
        box = [min(NewPoint[0], InitialPoint[0]), min(InitialPoint[1], NewPoint[1]), abs(NewPoint[0]-InitialPoint[0]), abs(NewPoint[1]-InitialPoint[1])]
        pygame.draw.rect(window, (0, 0, 0), (box[0], box[1], box[2], box[3]), 0)

        troopIndexes = gametree.getCollisionsWith(box)
        troops = []
        for troopIndex in troopIndexes:
            troops.append(gametree.values[troopIndex])

        cursor = cursor_blue
    else:
        cursor = cursor_red

    if MOVEMENT_MODE:
        window.blit(quarter_crosshairs, (InitialPoint[0]-320, InitialPoint[1]-320)) # paint to screen

        xDifference = NewPoint[0] - InitialPoint[0]
        yDifference = NewPoint[1] - InitialPoint[1]
        for troop in troops:
            troop.acc = np.array([xDifference, yDifference])/speed_limit_px

    if ATTACK_MODE:
        for creature in user.creatures: 
            if np.random.random() < 0.001: 
                creature.addBullet()

    user.show()
    user.update()

    enemy.show()
    enemy.update()

    user.directCreatures(nVel)

    pygame.display.flip()
