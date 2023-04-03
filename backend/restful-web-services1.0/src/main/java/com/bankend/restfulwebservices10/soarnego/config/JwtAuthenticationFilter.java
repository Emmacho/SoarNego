package com.bankend.restfulwebservices10.soarnego.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bankend.restfulwebservices10.soarnego.token.TokenRepository;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;



@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	private final JwtService jwtService;
	
	//public JwtAuthenticationFilter(JwtService jwtService) {
	//	this.jwtService = jwtService;
	//}
	private final UserDetailsService userDetailsService;

	private final TokenRepository tokenRepository;

	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain
			)
			throws ServletException, IOException {
			final String authHeader = request.getHeader("Authorization");
			final String jwt;
			final String userEmail;
			if (authHeader ==null || !authHeader.startsWith("Bearer ")) {
				filterChain.doFilter(request, response);
				return;
			}
			jwt = authHeader.substring(7);
			userEmail = jwtService.extractUsername(jwt); //todo extract the userEmail from JWT token; 
			//If we have user email and user is not authenticated, we get user details from DB
			if (userEmail != null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
				var isTokenValid = tokenRepository.findByToken(jwt)
						.map(t -> !t.isExpired() && !t.isRevoked())
						.orElse(false);
				//Then we check if the user if valid or not
				if (jwtService.isTokenValid(jwt, userDetails)) {
					//if the user and the token is valid, then we create an object of type token, see below userDetails, authorities as param
					UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
							userDetails,
							null,
							userDetails.getAuthorities()
							);
					//we enforce the authentication  token with details of our request
					authToken.setDetails(
							new WebAuthenticationDetailsSource().buildDetails(request)
							);
					//Update authentication token. i.e security context holder
					SecurityContextHolder.getContext().setAuthentication(authToken);
					
				}
			}
			filterChain.doFilter(request, response);
		
		
	}

}
