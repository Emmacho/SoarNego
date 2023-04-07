/*
package com.bankend.restfulwebservices10.soarnego.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankend.restfulwebservices10.soarnego.model.NewUserEntity;
import com.bankend.restfulwebservices10.soarnego.model.NewUserRepo;;

@RestController 
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api")
public class NewUserControler {
	
	@Autowired
	NewUserRepo newUserRepo;
	
	@PostMapping("/save/newUser")
	public ResponseEntity<NewUserEntity> createNewUserEntity(@RequestBody NewUserEntity newUserEntity){
		NewUserEntity _newUserEntity =  newUserRepo
				.save(new NewUserEntity(newUserEntity.getUsername(), newUserEntity.getUsername(),  
						newUserEntity.getEmail(),  newUserEntity.getPassword()));
		return new ResponseEntity<NewUserEntity>(_newUserEntity, HttpStatus.CREATED);
		
		
	}
	

}
*/
