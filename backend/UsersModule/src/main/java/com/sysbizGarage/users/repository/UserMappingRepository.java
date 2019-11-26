package com.sysbizGarage.users.repository;

import com.sysbizGarage.users.model.UserMapping;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserMappingRepository extends MongoRepository<UserMapping, String> {

}
