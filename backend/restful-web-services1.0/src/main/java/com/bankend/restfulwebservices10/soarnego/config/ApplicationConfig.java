package com.bankend.restfulwebservices10.soarnego.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bankend.restfulwebservices10.soarnego.model.NewUserRepo;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
	
	private final NewUserRepo userRepository;
	
	@Bean
	public UserDetailsService userDetailsService() {
	    return username -> userRepository.findByEmail(username)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
	  }
	
	//authentication provider
	@Bean 
	public AuthenticationProvider authenticationProvider() {
		//Data access object responsible to featch user details, password etc 
		//There are many implementation and DAO is one 
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		//telling authentication provider which userService to use
		authProvider.setUserDetailsService(userDetailsService()); 
		//Tell it which password encoder is used on the app
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}
	
	//AuthenticationManager is responsible to manage the authentications, has a method that help us to unthenticate user based on the username and password  
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
	//password Bean
	@Bean
	public PasswordEncoder passwordEncoder() {
		// TODO Auto-generated method stub
		return new BCryptPasswordEncoder();
	}
}
