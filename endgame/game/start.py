import pygame
import json
from end import *

cyber_blue = (0,255,242)
black = (0, 0, 0)
red = (255, 0, 0)

def drawRects(selected):
    if selected == 0:
        pygame.draw.rect(screen, cyber_blue, (50, 30, 250, 300), 8)
    elif selected == 1:
        pygame.draw.rect(screen, cyber_blue, (350, 30, 250, 300), 8)
    elif selected == 2:
        pygame.draw.rect(screen, cyber_blue, (650, 30, 250, 300), 8)

def circle(pos):
    screen.blit(cursor, pos)

pygame.init()
width=950;
height=600;
screen = pygame.display.set_mode((width, height))
screen.fill(black)
pygame.display.update()

cursor_blue = pygame.image.load("img/cursor_blue.png").convert()
cursor_red = pygame.image.load("img/cursor_red.png").convert()
cursor = cursor_red

# Species
jaegerImg = pygame.image.load("img/jaegar.jpg").convert()
jaegerImg = pygame.transform.scale(jaegerImg, (300, 250))
jaegerImg = pygame.transform.rotate(jaegerImg, -90)
x1 = 50;
y1 = 30;
# -------------------------------------------------------#
buggerImg = pygame.image.load("img/bugger.jpg").convert()
buggerImg = pygame.transform.scale(buggerImg, (300, 240))
buggerImg = pygame.transform.rotate(buggerImg, -90)
x2 = 350;
y2 = 30;
# -------------------------------------------------------#
illyrianImg = pygame.image.load("img/illyrian.png").convert()
illyrianImg = pygame.transform.scale(illyrianImg, (250, 300))
x2 = 350;
x3 = 650;
y3 = 30;

SPECIES = -1
selected = -1

def drawPics():
    screen.blit(jaegerImg, (x1, y1)) # paint to screen
    screen.blit(buggerImg, (x2, y2)) # paint to screen
    screen.blit(illyrianImg, (x3, y3)) # paint to screen

def get_pos():
    tPos =  pygame.mouse.get_pos()
    return [tPos[0]-20, tPos[1]-20]

pygame.display.flip() # paint screen one time
running = True
choosen = False
while (running):
    screen.fill(black)
    drawPics()
    pos=get_pos()
    circle(pos)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            # Set the x, y postions of the mouse click
            x, y = event.pos
            if jaegerImg.get_rect().collidepoint(x-x1, y-y1):
                print('clicked on Jaeger')
                SPECIES = "robot"
                choosen = True
                selected = 0
            elif buggerImg.get_rect().collidepoint(x-x2, y-y2):
                print('clicked on Buggers')
                SPECIES = "aliens"
                choosen = True
                selected = 1
            elif illyrianImg.get_rect().collidepoint(x-x3, y-y3):
                print('clicked on Illyrians')
                SPECIES = "fairy"
                choosen = True
                selected = 2
            elif rx_coor<x<(rx_coor+rx_size) and ry_coor<y<(ry_coor+ry_size):
                if choosen:
                    print("Clicked start. Your chosen species: "+SPECIES)
                    with open("start.json", "w") as f:
                        json.dump({"species": SPECIES+" rear"}, f)
                    end()
                else:
                    print("Have not chosen yet")

        if choosen == False:
            cursor = cursor_red
        if choosen == True:
            cursor = cursor_blue


        drawRects(selected)
        # Start button
        rx_coor = 350
        ry_coor = 450
        rx_size = 250
        ry_size = 100
        font = pygame.font.Font('freesansbold.ttf', 60)
        if choosen == False:
            pygame.draw.rect(screen, red, (rx_coor, ry_coor, rx_size, ry_size), 15)
            screen.blit(font.render('START', True, red), (rx_coor+22, ry_coor+25))
            #  (x coor, y coor, x size, y size)
        if choosen == True:
            pygame.draw.rect(screen, cyber_blue, (rx_coor, ry_coor, rx_size, ry_size), 15)
            screen.blit(font.render('START', True, cyber_blue), (rx_coor+22, ry_coor+25))
            #  (x coor, y coor, x size, y size)
        pygame.display.update()
