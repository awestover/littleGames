import numpy as np
from PIL import Image

import sys

try:
    name = sys.argv[1]
    num = int(sys.argv[2])
except:
    print("*"*100+"\nprovide image name (not a path, a prefix) and number of images \n"+"*"*100)

list_im = ["{}{}.png".format(name, str(i)) for i in range(1,num+1)]
imgs    = [ Image.open(i) for i in list_im ]
# pick the image which is the smallest, and resize the others to match it (can be arbitrary image shape here)
min_shape = sorted( [(np.sum(i.size), i.size ) for i in imgs])[0][1]
imgs_comb = np.hstack( (np.asarray( i.resize(min_shape) ) for i in imgs ) )

# save that beautiful picture
imgs_comb = Image.fromarray( imgs_comb)
imgs_comb.save("{}.png".format(name))

