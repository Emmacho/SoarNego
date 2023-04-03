package com.bankend.restfulwebservices10.soarnego.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	
	//This is a token that would be sent back to the customer of user
	private String token;
	

}
