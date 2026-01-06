package com.company.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.company.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
