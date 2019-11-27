from Creature import *
class User:
    def __init__(self, images, window, anType, name):
        self.anType=anType
        self.creatures = []
        self.images = images
        self.creatureType = "crab"
        self.window = window
        self.screen_dims=window.get_size()
        self.name = name

    def randomCreatureVels(self):
        for creature in self.creatures:
            creature.randomHeading()

    def initCreatures(self, ypos):
        distance = (self.screen_dims[0]-4*200)/2
        for i in range(0, 5):
            self.addCreature([distance, ypos])
            distance += 200

    def addCreature(self, pos):
        self.creatures.append(Creature(self.anType, self.name, pos))

    def show(self):
        for creature in self.creatures:
            creature.show(self.window, self.images)

    def update(self):
        for creature in self.creatures:
            creature.update(self.screen_dims)
        self.funeral()

    def directCreatures(self, acc):
        for creature in self.creatures:
            creature.acc = acc

    def funeral(self):
        for i in range(len(self.creatures)-1, -1, -1):
            if self.creatures[i].health <= 0:
                self.creatures.pop(i)

    def dead(self):
        return len(self.creatures)==0
