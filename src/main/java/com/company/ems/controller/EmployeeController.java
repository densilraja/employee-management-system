package com.company.ems.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.company.ems.entity.Employee;
import com.company.ems.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {
	
	private final EmployeeService employeeService;
	
	public EmployeeController (EmployeeService employeeService) {
		this.employeeService = employeeService;
	}
	
	//Create
	@PostMapping
	public Employee createEmployee(@Valid @RequestBody Employee employee) {
	    return employeeService.saveEmployee(employee);
	}

	
	//Read All
	@GetMapping
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	//Read By ID
	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable Long id) {
		return employeeService.getEmployeeById(id);
	}
	
	//Update
	@PutMapping("/{id}")
	public Employee updateEmployee(
			@PathVariable Long id,
			@RequestBody Employee employee) {
		return employeeService.updateEmployee(id, employee);
	}
	
	//Delete
	@DeleteMapping("/{id}")
	public String deleteEmployee(@PathVariable Long id) {
		employeeService.deleteEmployee(id);
		return "Employee Deleted Successfully";
	}
	
	

	
}
