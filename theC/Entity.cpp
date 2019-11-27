
#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>
#include "Entity.hpp"

// want: load width, health, attach, speed from a config file, or something 
Entity::Entity(int maxHealth_, int attack_, int speed_) {
	maxHealth = maxHealth_;
	attack = attack_;
	speed = speed_;
}

void Entity::initImage(std::string imgPath, int width_, sf::Vector2i aniFrameMax_) {
	aniFrameMax = aniFrameMax_;
	width = width_;
	texture.loadFromFile(imgPath);
	sprite.setTexture(texture);
	boundingBox.setSize(sf::Vector2f(width, width));
	boundingBox.setFillColor(sf::Color(0,255,0,75));
}

void Entity::displayState() {
	std::cout << "im not disclosed to give away any info about this entity" << std::endl;
}


