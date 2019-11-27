from Bullet import *
import numpy as np
import pygame
class Creature:
    def __init__(self, anType, master, pos=[0.0, 0.0]):
        self.pos = np.array(pos).astype("float64")
        self.vel = np.array([0.0,0.0])
        self.acc = np.array([0.0,0.0])
        self.image = anType

        self.maxVel = 3.0
        self.dims = [100, 100]
        self.master = master

        self.health=10
        self.damage=10
        self.shield=10

        self.bullets = []

    def show(self, window, images):
        tmpImage = pygame.transform.scale(images[self.image], (100, 100))
        window.blit(tmpImage, (self.pos[0], self.pos[1]))
        remainingHealth = int(max(min(self.health / float(10) * 100, 100), 0))
        pygame.draw.rect(window, (0, 255, 0), (self.pos[0], self.pos[1]-40, remainingHealth, 10), 0)

        for bullet in self.bullets:
            bullet.show(window)

    def addBullet(self):
        self.bullets.append(Bullet(np.copy(self.pos), 2*np.copy(self.vel), self.master))

    def randomHeading(self):
        self.vel = np.random.random(2)

    def getBox(self):
        return [self.pos[0], self.pos[1], self.dims[0], self.dims[1]]

    def handleCollide(self, other):
        if other.master != self.master:
            self.die()
            other.die()

    def die(self):
        self.health = 0

    def update(self, screen_dims):
        self.pos += self.vel #*dt
        self.vel += self.acc #*dt

        self.clear_dead()

        for bullet in self.bullets:
            bullet.update(screen_dims)

        if (np.linalg.norm(self.vel) > self.maxVel):
            self.vel *= self.maxVel / (np.linalg.norm(self.vel))

        if (self.pos[0] < 0):
            self.acc[0] = 0
            self.vel[0] = -self.vel[0]
            self.pos[0] = 0

        if (self.pos[0] + self.dims[0] > screen_dims[0]):
            self.acc[0] = 0
            self.vel[0] = -self.vel[0]
            self.pos[0] = screen_dims[0]-self.dims[0]

        if (self.pos[1] < 0):
            self.acc[1] = 0
            self.vel[1] = -self.vel[1]
            self.pos[1] = 0

        if (self.pos[1] + self.dims[1] > screen_dims[1]):
            self.acc[1] = 0
            self.vel[1] = -self.vel[1]
            self.pos[1] = screen_dims[1] - self.dims[1]


    def clear_dead(self):
        ct=0
        for i in range(len(self.bullets)-1, -1, -1):
            if self.bullets[i].dead == True:
                self.bullets.pop(i)
                self.addBullet()
                # ct+=1
        # for i in range(0, ct):
