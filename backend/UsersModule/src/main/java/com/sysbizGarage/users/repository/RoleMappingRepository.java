package com.sysbizGarage.users.repository;

import com.sysbizGarage.users.model.RoleMapping;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;


public interface RoleMappingRepository extends MongoRepository<RoleMapping, String>, RoleMappingCustomRepository
{
  RoleMapping findByRoleNameIgnoreCase(@Param("userName") String roleName);
  RoleMapping findByRoleId(int roleId);
}
