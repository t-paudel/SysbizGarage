package com.sysbizGarage.users.repository;

import com.sysbizGarage.users.model.UserPersonalDetails;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserPersonalDetailsRepository extends MongoRepository<UserPersonalDetails, String> 
{

}
