package com.sysbizGarage.users.repository;

import java.util.List;

import com.sysbizGarage.users.model.RoleMapping;

public interface RoleMappingCustomRepository 
{
    public List<RoleMapping> fetchRoleName();
}