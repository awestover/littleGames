
import random
N = 32
data = "\n".join([ " ".join([random.choice(["w","w","w","f","w","g","s"]) for j in range(N)]) for i in range(N)])

with open("map.txt", "w") as f:
    f.write(data)
