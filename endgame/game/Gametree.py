# the game tree. checks all collisions

class Gametree:
    def __init__(self):
        self.values = []

    def clear(self):
        self.values=[]

    def insert(self, val):
        self.values.append(val)
        for bullet in val.bullets: 
            self.values.append(bullet)

    def insertUser(self, user):
        for creature in user.creatures:
            self.insert(creature)

    def getCollisions(self):
        # crummy comparison For Now
        collisions = [];
        for i in range(0, len(self.values)):
          for j in range(i+1, len(self.values)):
              if (self.checkBoxCollide(self.values[i].getBox(), self.values[j].getBox())):
                collisions.append([i, j]);
        return collisions;

    # 1 d collision detection (real number line)
    def collideX(self, a, b):
        return ((b[0] < a[1]) and (b[1] > a[0]));

    # do 2 boxes intersect?
    def checkBoxCollide(self, a, b):
        xInt = self.collideX([a[0], a[0]+a[2]], [b[0], b[0]+b[2]]);
        yInt = self.collideX([a[1], a[1]+a[3]], [b[1], b[1]+b[3]]);
        return (xInt and yInt);

    # collisions with box
    def getCollisionsWith(self, box):
        collisions = []
        for i in range(0, len(self.values)):
            if (self.checkBoxCollide(box, self.values[i].getBox())):
                collisions.append(i)
        return collisions
