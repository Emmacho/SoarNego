package com.bankend.restfulwebservices10.soarnego.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.http.HttpMethod;

//This is a binder class
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	private final JwtAuthenticationFilter jwtAuthFilter;

	private final AuthenticationProvider authenticationProvider;

	private final LogoutHandler logoutHandler;

	// Bean for configuring all the security of the application
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf()
				// disabling csrf here
				.disable()
				// implement white listing
				.authorizeHttpRequests()
				.antMatchers("/api/v1/auth/**", "/api/save/files", "/api/get/all-files")
				.permitAll()
				.antMatchers(HttpMethod.PUT, "/api/update/files/**")
				.permitAll()
				.antMatchers(HttpMethod.GET, "/api/find/files/**")
				.permitAll()
				.anyRequest()
				.authenticated()

				// configure session management-authentication/session state should not be
				// stored
				// which makes our app stateless and ensure each request is authenticated
				// .and used to add new configuration
				.and()
				.cors()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.logout()
				.logoutUrl("/api/v1/auth/logout")
				.addLogoutHandler(logoutHandler)
				.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());

		return http.build();
	}

}
