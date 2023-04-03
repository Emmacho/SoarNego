package com.bankend.restfulwebservices10.soarnego.auth;

import com.bankend.restfulwebservices10.soarnego.token.TokenRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bankend.restfulwebservices10.soarnego.config.JwtService;
import com.bankend.restfulwebservices10.soarnego.model.NewUserEntity;
import com.bankend.restfulwebservices10.soarnego.model.Role;
import com.bankend.restfulwebservices10.soarnego.model.NewUserRepo;
import com.bankend.restfulwebservices10.soarnego.token.Token;
import com.bankend.restfulwebservices10.soarnego.token.TokenType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final NewUserRepo repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	private final TokenRepository tokenRepository;

	public AuthenticationResponse register(RegisterRequest request) {
		var user = NewUserEntity.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER)
				.build();

		// TODO Auto-generated method stub
		//must create a user, save to the DB and return generated  tokenfrom it
		//we need to interact with the DB and see if the user already exist there
		//therefore we need to inject the repository.
		//then creates a user object out of object RegisterResquest
		repository.save(user);
		//To return the authentication that contains the token, we will craete a new var jwtToken
		var savedUser = repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		// TODO Auto-generated method stub
		//means user authenticated
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
				)
		);
		var user = repository.findByEmail(request.getEmail())
				.orElseThrow(); //might want to throw correct exception and handle it
		var jwtToken = jwtService.generateToken(user);
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();


	}

	private void saveUserToken(NewUserEntity user, String jwtToken) {
		var token = Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(token);
	}

	private void revokeAllUserTokens(NewUserEntity user) {
		var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		tokenRepository.saveAll(validUserTokens);
	}
}
