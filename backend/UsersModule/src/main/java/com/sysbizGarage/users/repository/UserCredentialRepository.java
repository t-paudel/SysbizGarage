package com.sysbizGarage.users.repository;

import com.sysbizGarage.users.model.UserCredentials;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserCredentialRepository extends MongoRepository<UserCredentials, String> 
{
	UserCredentials findByUserIdAndPassword(String userId, String password);
}
