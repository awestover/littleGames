objects=main.o break.o
main: $(objects)
	g++ -std=c++11 $(objects) -o main
	./main
main.o: main.cpp
	g++ -std=c++11 -c main.cpp
break.o: break.cpp break.hpp
	g++ -std=c++11 -c break.cpp
arr2dPass: arr2dPass.cpp
	g++ -std=c++11 -c break.cpp
	g++ -std=c++11 arr2dPass.cpp -o arr2dPass 
	./arr2dPass
passer:
	g++ -std=c++11 passer.cpp -o passer
	./passer
clean:
	rm -f arr2dPass
	rm -f main
	rm -f passer
	rm -f *.o
