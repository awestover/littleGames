
#include <iostream>

#include "Quadtree.hpp"

// there has got to be an efficient way to build the quadtree!!!!! 
// why?: things cant move very far per turn!!

Quadtree::Quadtree() {
	numAnimals = 0;
}

void Quadtree::loadSpecies(Animal** animalsToAdd, int numAnimalsToAdd) {
	for (int i = 0; i < numAnimalsToAdd; i++) {
		std::cout<<animalsToAdd[i]<<std::endl;
		animals.push_back(animalsToAdd[i]);
		numAnimals += 1;

		std::cout<<"siez:"<<animals.size()<<std::endl;
	}
}

// there must be a better way, this is really stupid
void Quadtree::clear(){
	while(!animals.empty()){
		animals.pop_back();
		numAnimals -= 1;
	}
}

void Quadtree::checkCollisions(){
	for (int i = 0; i < numAnimals; i++) {
		for (int j = i+1; j < numAnimals; j++) {
			if(animals[i]->collidesWith(animals[j])){
				animals[i]->die();
				animals[j]->die();
	 		}
		}
	}
}

