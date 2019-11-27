#ifndef QUADTREE
#define QUADTREE

// why do I need to include this garbage?
#include <SFML/Graphics.hpp>
#include <vector>

#include "Entity.hpp"
#include "Animal.hpp"

class Quadtree {
	public:
		std::vector <Animal*> animals;
		int numAnimals;

		Quadtree();
		void checkCollisions();
		void loadSpecies(Animal** animalsToAdd, int numAnimalsToAdd);
		void clear();
};
#endif // QUADTREE
