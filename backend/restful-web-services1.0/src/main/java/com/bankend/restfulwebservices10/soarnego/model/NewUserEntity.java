package com.bankend.restfulwebservices10.soarnego.model;

import java.util.Collection;
import java.util.List;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bankend.restfulwebservices10.soarnego.token.Token;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "userTable")
public class NewUserEntity implements UserDetails{
	
	  @Id
	  @GeneratedValue
	  private Integer id;
	  private String firstname;
	  private String lastname;
	  private String email;
	  private String password;

	  @Enumerated(EnumType.STRING)
	  private Role role;

	  @OneToMany(mappedBy = "user")
	  private List<Token> tokens;

	
	  public Collection<? extends GrantedAuthority> getAuthorities() {
	    return List.of(new SimpleGrantedAuthority(role.name()));
	  }

	  
	  public String getPassword() {
	    return password;
	  }

	 
	  public String getUsername() {
	    return email;
	  }

	 
	  public boolean isAccountNonExpired() {
	    return true;
	  }

	
	  public boolean isAccountNonLocked() {
	    return true;
	  }

	 
	  public boolean isCredentialsNonExpired() {
	    return true;
	  }

	 
	  public boolean isEnabled() {
	    return true;
	  }
	
	

}
