//package com.bankend.restfulwebservices10.soarnego.basicauth;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.HttpStatusEntryPoint;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
//
//
//@Configuration
//@EnableWebSecurity
//public class BasicAuthWebSecurityConfiguration {
//	
//	
//	@Autowired private AppBasicAuthenticationEntryPoint authenticationEntryPoint;
//	
////	@Autowired
////    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
////        auth
////          .inMemoryAuthentication()
////          .withUser("user1")
////          .password(passwordEncoder().encode("user1Pass"))
////          .authorities("ROLE_USER");
////    }
//	
//	@Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        .and().csrf().disable()
//        .formLogin().disable()
//        .httpBasic().disable()
//        .exceptionHandling()
//        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.FORBIDDEN))
//        .and()
//        .authorizeRequests()
//        .antMatchers("/", "/error", "/index", "/swagger*/**", "/v2/api-docs/**", "/h2-console/**")
//        .permitAll()
//        .anyRequest().authenticated()
//        .and()
//        .headers().frameOptions().disable();
//		
//		//http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
//		
//        return http.build();
//    }
//    
//	@Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//
//}
//
//
