package com.bankend.restfulwebservices10.soarnego.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

//
@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService service;

	
	@PostMapping("/register")
	// responseEntity<type- object to be created> register is the method
	//register is the method name and this register will need a requestBody
	//we need to create an object called RegisterRequest
	//which will hold all the request of the registry information 
	//such as fistName, lastName and Passsword
	public ResponseEntity <AuthenticationResponse> register(
			@RequestBody RegisterRequest request
			){
		//delegate to authenticationService
		//make simple call for the service method that we have injected up
		 return ResponseEntity.ok(service.register(request));
	}
	
	
	
	@PostMapping("/authenticate")
	// responseEntity<type- object to be created> register is the method
	//register is the method name and this register will need a requestBody
	//we need to create an object called AuthenticateRequest
	//which will hold all the request of the registry information 
	//such as fistName, lastName and Passswow
	public ResponseEntity <AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
			){
		return ResponseEntity.ok(service.authenticate(request)); 
	}
	
	

}
