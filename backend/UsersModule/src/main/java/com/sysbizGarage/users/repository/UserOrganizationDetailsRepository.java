package com.sysbizGarage.users.repository;

import java.util.List;

import com.sysbizGarage.users.model.UserOrganizationDetails;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface UserOrganizationDetailsRepository extends MongoRepository<UserOrganizationDetails, String> 
{
    UserOrganizationDetails findByUserIdIgnoreCase(@Param("userId")String userId);

    List<UserOrganizationDetails> findByRoleNameIgnoreCase(@Param("roleName")String roleName);
}
