import pygame
import numpy as np
red = (255, 0, 0)

class Bullet:
    def __init__(self, pos, vel, master):
        self.pos=pos
        self.vel=vel
        self.dead=False
        self.radius = 5
        self.master = master

    def getBox(self): 
        return [self.pos[0], self.pos[1],self.radius, self.radius]

    def show(self, window):
        pygame.draw.circle(window, red, (int(self.pos[0]), int(self.pos[1])), self.radius)

    def update(self, screen_dims):
        self.pos += self.vel
        if self.pos[0]<0 or self.pos[0]>screen_dims[0] or self.pos[1]<0 or self.pos[1]>screen_dims[1]:
            self.dead=True

    def randomHeading(self):
        self.vel = np.random.random(2)
