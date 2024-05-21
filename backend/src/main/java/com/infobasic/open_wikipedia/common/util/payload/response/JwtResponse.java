package com.infobasic.open_wikipedia.common.util.payload.response;

import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

  private String token;
  private String type = "Bearer";

  private UserDetails user;

  public JwtResponse(String token, UserDetails user) {
    this.token = token;
    this.user = user;

  }

}
