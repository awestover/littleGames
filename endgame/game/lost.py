import pygame
from pygame.locals import *
from end import *

black = (0,0,0)
cyber_blue = (0,255,242)

pygame.init()
width=950;
height=600;
screen = pygame.display.set_mode((width, height))
screen.fill(black)
pygame.display.update()

cursor = pygame.image.load("img/cursor_blue.png").convert()

def get_pos():
    tPos =  pygame.mouse.get_pos()
    return [tPos[0]-20, tPos[1]-20]

def circle(pos):
    screen.blit(cursor, pos)

endgame = True
running = True
User_win = False
while (running):
    screen.fill(black)
    pos=get_pos()
    circle(pos)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        #end text
        rx_coor = 375
        ry_coor = 450
        rx_size = 200
        ry_size = 100
        font = pygame.font.Font('freesansbold.ttf', 60)

        #Who_win = check_for_win()

        #if who_win == User_win:
        if User_win:
            screen.blit(font.render('YOU WON', True, cyber_blue), (rx_coor-50, ry_coor-200))
        else:
            screen.blit(font.render('YOU LOST', True, cyber_blue), (rx_coor-50, ry_coor-200))

        # end button
        if endgame == True:
            pygame.draw.rect(screen, cyber_blue, (rx_coor, ry_coor, rx_size, ry_size), 15)
            screen.blit(font.render('QUIT', True, cyber_blue), (rx_coor+22, ry_coor+25))
            #  (x coor, y coor, x size, y size)
        pygame.display.update()

        if event.type == pygame.MOUSEBUTTONDOWN:
            # Set the x, y postions of the mouse click
            x, y = event.pos
            if rx_coor<x<(rx_coor+rx_size) and ry_coor<y<(ry_coor+ry_size):
                end()