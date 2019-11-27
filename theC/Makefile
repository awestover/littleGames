# this makefile is kinda broken, atm run make clean pretty much every time
objects=main.o Entity.o User.o Animal.o World.o Quadtree.o
main: $(objects) # Entity.hpp User.hpp Animal.hpp World.hpp Quadtree.hpp
	g++ -std=c++11 $(objects) -o main -lsfml-audio -lsfml-graphics -lsfml-window -lsfml-system
	./main
main.o: main.cpp
	g++ -std=c++11 -c main.cpp
Entity.o: Entity.cpp Entity.hpp
	g++ -std=c++11 -c Entity.cpp
User.o: User.cpp User.hpp
	g++ -std=c++11 -c User.cpp
Animal.o: Animal.cpp Animal.hpp
	g++ -std=c++11 -c Animal.cpp
World.o: World.cpp World.hpp
	g++ -std=c++11 -c World.cpp
Quadtree.o: Quadtree.cpp Quadtree.hpp
	g++ -std=c++11 -c Quadtree.cpp
clean:
	rm -f *.o
	rm -f main
