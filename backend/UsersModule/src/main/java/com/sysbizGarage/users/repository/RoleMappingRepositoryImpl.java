package com.sysbizGarage.users.repository;

import java.util.ArrayList;
import java.util.List;

import com.sysbizGarage.users.model.RoleMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

public class RoleMappingRepositoryImpl implements RoleMappingCustomRepository 
{

    @Autowired
    private MongoOperations operations;


    @Override
    public List<RoleMapping> fetchRoleName() 
    {
        List<RoleMapping> roleNames = new ArrayList<>();
        Query searchQuery = new Query();

        searchQuery.fields().include("roleName");
        searchQuery.fields().exclude("_id");
        
        System.out.println(searchQuery);

        roleNames = operations.find(searchQuery, RoleMapping.class);

        return roleNames;
    }

}