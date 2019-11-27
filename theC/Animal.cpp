
#include <SFML/Graphics.hpp>
#include <math.h>
#include <iostream>

#include "World.hpp"
#include "Entity.hpp"
#include "Animal.hpp"

Animal::Animal(Entity* entity_, sf::Vector2f pos_){
	entity = entity_;
	aniFrame = sf::Vector2i(0,0);
	pos = pos_;
	vel = sf::Vector2f(0,0);
	lastWanderTh = 0;
}

// island location of the center of the animal	
int Animal::getIslandLocation(){
	int i = ((int)(pos.y + entity->width/2))/tileWidth;
	int j = ((int)(pos.x + entity->width/2))/tileWidth;
	return i*mapSize + j;
}

void Animal::setRandVel() {
	lastWanderTh = 2*M_PI*((rand()%1000)/1000.0f);
	vel.x = entity->speed*cos(lastWanderTh);
	vel.y = entity->speed*sin(lastWanderTh);
}

void Animal::nextFrame() {
	aniFrame.x = (aniFrame.x + 1) % entity->aniFrameMax.x;
}

void Animal::display(sf::RenderWindow* window) {
	entity->sprite.setTextureRect(sf::IntRect(entity->width*aniFrame.x, entity->width*aniFrame.y, entity->width, entity->width));
	entity->sprite.setPosition(pos);
	window->draw(entity->sprite);
	// entity->boundingBox.setPosition(pos);
	// window->draw(entity->boundingBox);
}

// th > 0 -> 1
// th < 0 -> -1
// th = 0 -> 0
int sgn(float th){
	return (th > 0) - (th < 0);
}

void Animal::wanderIsland(int* islandComponents, float dt) {
	float th;
	// if(rand() % 2 == 0)
		// th = lastWanderTh*0.5f;
	// else
	th = (M_PI/16.0f)*(((rand()%1000) - 500)/1000.0f);
	float newVelX = cos(th)*vel.x-sin(th)*vel.y;
	float newVelY = sin(th)*vel.x+cos(th)*vel.y;

	if(vel.x*newVelX < 0) {
		// std::cout<<"rig the dice"<<std::endl;
		// std::cout<<"proposedNewVel: "<<newVelX<<std::endl;
		// std::cout<<"oldVel: "<<vel.x<<std::endl;
		// std::cout<<"th_i: "<<th<<std::endl;
		// th += sgn(th)*M_PI/2.0f;
		// std::cout<<"th_f: "<<th<<std::endl;
		// // th *= 4; // go a bit more
		// float newVelX = cos(th)*vel.x-sin(th)*vel.y;
		// float newVelY = sin(th)*vel.x+cos(th)*vel.y;
		// std::cout<<"realNewVel: "<<newVelX<<std::endl;
		// FIND A BETTER WAY to make it so that it can't rapidly flip between right and left avatars!!! ALEK ALEK ALEK
		newVelY = 0;
		newVelX = sgn(newVelX)*entity->speed;
	}

	vel.x = newVelX;
	vel.y = newVelY;

	int oldIslandLocation = getIslandLocation();
	pos += dt*vel;
	int newIslandLocation = getIslandLocation();
	if(*(islandComponents+oldIslandLocation) != *(islandComponents+newIslandLocation)) {
		vel = -1.0f*vel;
		pos += 2*dt*vel;
	}
	aniFrame.y = vel.x < 0 ? 1 : 0;
}

void Animal::applyVel(float dt) {
	pos += dt*vel;
	aniFrame.y = vel.x < 0 ? 1 : 0;
}

bool Animal::collidesWith(Animal* otherAnimal) {
	// min(max) > max(min)
	bool xIn = std::min(pos.x+entity->width, otherAnimal->pos.x + otherAnimal->entity->width) > std::max(pos.x, otherAnimal->pos.x);
	bool yIn = std::min(pos.y+entity->width, otherAnimal->pos.y + otherAnimal->entity->width) > std::max(pos.y, otherAnimal->pos.y);
	return xIn && yIn;
}

void Animal::die(){
	// stagnation is death
	vel.x = 0;
	vel.y = 0;
}

